# Initialization

When a new Scripsi tab opens in your browser, the application loads state in stages:

1. Saved settings are loaded from local storage. If no settings are found, defaults are used.
2. Saved nodes are loaded from primary backend defined in settings.
  - If backend throws an authorization error, user has to re-authorize before app fully loads.
  - If backend throws any other error, data loading fails.


Data persistence can be a tricky problem for client-side applications (okay -- for *all* applications). Since Scripsi is a PIM at heart, data integrity is critical for long-term usage. As a benchmark, it should provide some invariants against data loss:

1. All changes are synchronously cached in the client-side code to minimize input latency and jitter.
2. All database changes are asynchronously replicated to a persistent storage location.
3. The user is warned if they take any actions that may result in data erasure, either in the local cache or in the persistent store.
4. Any operation can be undone at any time, from anywhere.

This idea is not so different (conceptually) than a database that implements asynchronous replication. In that model, the in-memory cache is our primary database, which is "restored" from a replica every time the page is reloaded. Thinking about it as a database operation can be helpful to reason through all the ways things can go horribly wrong and cause data loss:

- Dirty reads
- Two open tabs writing conflicting data to the persistent store. (Dirty writes)
- Persistent store is temporarily unable to accept reads and/or writes. (Database node failure)
- Persistent store may take an unreasonably long time to process reads and/or writes. (Replication lag)

Additionally, because Scripsi is designed to be as server-agnostic as possible, it is not tied to a single canonical database, and does not have user accounts, per se. Instead, users can choose to replicate their data to one or more *backends*, each of which stores its own (eventually-consistent) copy of the data. This introduces some more concerns:

- Persisting to more than one backend at a time.
- Switching backends without data loss.
- Handling backend authentication workflows.

Finally, because Scripsi databases may be quite large, it becomes necessary to avoid saving the entire database on changes. Instead, there must be a way to efficiently save modified subsets of the data, while leaving the rest untouched.

However, we can make two simplifying assumptions, based on the fact that Scripsi is not (yet) intended to support collaborative editing:

- Multiple tabs do not need to simultaneously write to the same backend.
- The user can be directly involved, for instance by resolving conflicting writes (e.g. "Use mine" vs. "Use theirs").

## Versioning

> Any operation can be undone at any time, from anywhere.

When implementing undo, 