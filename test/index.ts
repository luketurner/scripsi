// Sets up testing environment.
// This project uses a domain-driven folder architecture, meaning that tests
// are stored in the same folder as the files they are testing, not in this
// folder.

const expect = chai.expect;

const testsContext = (<any>require).context("../src", true, /.spec$/);
testsContext.keys().forEach(testsContext);