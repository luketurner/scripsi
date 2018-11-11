# Initialization

When a new Scripsi tab opens in your browser, the application loads state in stages:

1. Saved settings are loaded from local storage. If no settings are found, defaults are used.
2. Saved nodes are loaded from primary backend defined in settings.
  - If backend throws an authorization error, user has to re-authorize before app fully loads.
  - If backend throws any other error, data loading fails.


# Data persistence in Scripsi

Scripsi persists data in the following places:

- All nodes are immediately written to an in-memory database, which represents the most up-to-date state of the application.
- The in-memory nodes are regularly written to one or more storage backends. (During normal operation, backends should never be more than 1000ms behind the in-memory state.)
- Application settings are written to the browser's local storage.

Data persistence can be a tricky problem for client-side applications (okay -- for *all* applications). Since Scripsi is a PIM at heart, data integrity is critical for long-term usage. As a baseline, it should provide some invariants against data loss:

1. All changes are synchronously cached in the client-side code to minimize input latency and jitter.
2. All database changes are asynchronously replicated to a persistent storage location.
3. The user is warned if they take any actions that may result in data erasure, either in the local cache or in the persistent store.
4. Any recent operation can be undone at any time, from anywhere.

This idea is not so different (conceptually) than a database that implements asynchronous replication. In that model, the in-memory cache is our primary database, which is "restored" from a replica every time the page is reloaded. Thinking about it as a database operation can be helpful to reason through all the ways things can go horribly wrong and cause data loss:

- A new tab reading inconsistent state if another tab is mid-update. (Dirty reads)
- Two open tabs writing conflicting data to the persistent store. (Dirty writes)
- Persistent store is temporarily unable to accept reads and/or writes. (Database node failure)
- Persistent store may take an unreasonably long time to process reads and/or writes. (Replication lag)

Usually, webapps seem to implement one of two approaches to solving this problem: 

1. Prohibit more than one session from editing the same data at the same time (i.e. document locking). Typically used by classical PIM solutions.
2. Implement collaborative editing. Workflowy, Google Docs, and most modern tools take this approach.

Ideally, Scripsi would implement (2), but the initial implementation aims to achieve (1) instead. In short, tabs are prevented from overwriting each other's changes at any time. 

Additionally, because Scripsi is designed to be as server-agnostic as possible, it is not tied to a single canonical database, and does not have user accounts. Instead, users can choose to replicate their data to one or more *backends*, each of which stores its own (eventually-consistent) copy of the data. This introduces some more concerns:

- Persisting to more than one backend at a time.
- Switching backends without data loss.
- Handling backend authentication workflows.

Finally, because Scripsi databases may be quite large, it becomes necessary to avoid saving the entire database on changes. Instead, there must be a way to efficiently save modified subsets of the data, while leaving the rest untouched.

However, we can make two simplifying assumptions, based on the fact that Scripsi is not (yet) intended to support collaborative editing:

- Multiple tabs do not need to simultaneously write to the same backend.
- The user can be directly involved, for instance by resolving conflicting writes (e.g. "Use mine" vs. "Use theirs").

## Versioning

> Any recent operation can be undone at any time, from anywhere

When implementing undo, we need some kind of "breadcrumb trail" that allows us to move the state of the application back in time. (If we want redo, then we have to be able to move forward in time as well). Instead of using a diff-based method, Scripsi implements an "immutable" version history of its internal state, as follows:

- Instead of storing `StateObject`, we store an `Array<StateObject>` (called a state vector), and maintain a `currentState` numerical value that points to the last index in the array. Whenever a change is made, a new StateObject with the changes is appended to the state vector, and `currentState` is incremented.
- If an undo is requested, the `currentState` pointer is decremented.
- If a redo is requested, the `currentState` pointer is incremented.
- If the user performs an undo and then makes a change, the state vector is truncated to `currentState` before the change is pushed. (Could use a branching undo tree instead, but I'm not sure it's worth the complexity).

Because we specify that recent operations can be undone *from anywhere*, the entire state vector needs to be persisted so operations can be undone from different tabs.