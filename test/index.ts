// Sets up testing environment.
// This project uses a feature-driven folder architecture, meaning that tests
// are stored in the same folder as the files they are testing, not here.

const expect = chai.expect;

const testsContext = (<any>require).context("../src", true, /.spec$/);
testsContext.keys().forEach(testsContext);