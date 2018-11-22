import { textFromHtml, textToHtml } from './text';

import { expect } from 'chai';

import { describe, it } from 'mocha';

describe('text markup', () => {

  describe('.textFromHtml', () => {
    it('should not change unformatted text', () => {
      expect(textFromHtml('hi there, this is some text. <>!@#$%^&*()_+{}|[]')).to.eql('hi there, this is some text. <>!@#$%^&*()_+{}|[]');
    });

    it('should convert <em>...</em> to _..._', () => {
      expect(textFromHtml('<em>emphasis</em>')).to.eql('_emphasis_');
      expect(textFromHtml('this is <em>emphasis</em>...')).to.eql('this is _emphasis_...');
      expect(textFromHtml('<em><>!@#$%^&*()_+{}|[]</em>')).to.eql('_<>!@#$%^&*()_+{}|[]_');
    });

    it('should convert <strong>...</strong> to **...**', () => {
      expect(textFromHtml('<strong>strong</strong>')).to.eql('**strong**');
      expect(textFromHtml('this is <strong>strong</strong>...')).to.eql('this is **strong**...');
      expect(textFromHtml('<strong><>!@#$%^&*()_+{}|[]</strong>')).to.eql('**<>!@#$%^&*()_+{}|[]**');
    });

    it('should convert <a href="x">y</a> to [y](x)', () => {
      expect(textFromHtml('<a href="http://luketurner.org">link</a>')).to.eql('[link](http://luketurner.org)');
      expect(textFromHtml('this is a <a href="http://luketurner.org">link</a>.')).to.eql('this is a [link](http://luketurner.org).');
      expect(textFromHtml('<a href="http://luketurner.org"><>!@#$%^&*()_+{}|[]</a>')).to.eql('[<>!@#$%^&*()_+{}|[]](http://luketurner.org)');
    });

    it('should convert <a href="#tag"> to #tag', () => {
      expect(textFromHtml('<a href="#tag">#tag</a>')).to.eql('#tag');
      expect(textFromHtml('this is a <a href="#tag">#tag</a>...')).to.eql('this is a #tag...');
    });
  });

  describe('.textToHtml', () => {
    it('should not change unformatted text', () => {
      expect(textToHtml('hi there, this is some text. <>!@#$%^&*()_+{}|[]')).to.eql('hi there, this is some text. <>!@#$%^&*()_+{}|[]');
    });

    it('should support *...*', () => {
      expect(textToHtml('*test*')).to.eql('<em>test</em>');
      expect(textToHtml('*test**')).to.eql('<em>test</em>*');
      expect(textToHtml('test *test* test')).to.eql('test <em>test</em> test');
      expect(textToHtml('a *test*.')).to.eql('a <em>test</em>.');
      expect(textToHtml('a *test.*')).to.eql('a <em>test.</em>');
      expect(textToHtml('a *te\\*st*')).to.eql('a <em>te*st</em>');
      expect(textToHtml('a *te_st*')).to.eql('a <em>te_st</em>');
      expect(textToHtml('a *test_')).to.eql('a *test_');
      expect(textToHtml('\\*test*')).to.eql('*test*');
      // expect(textToHtml('a * test * ')).to.eql('a * test * ');
    });

    it('should support _..._', () => {
      expect(textToHtml('_test_')).to.eql('<em>test</em>');
      expect(textToHtml('_test__')).to.eql('<em>test</em>_');
      expect(textToHtml('test _test_ test')).to.eql('test <em>test</em> test');
      expect(textToHtml('a _test_.')).to.eql('a <em>test</em>.');
      expect(textToHtml('a _test._')).to.eql('a <em>test.</em>');
      expect(textToHtml('a _te\\_st_')).to.eql('a <em>te_st</em>');
      expect(textToHtml('a _te*st_')).to.eql('a <em>te*st</em>');
      expect(textToHtml('\\_test_')).to.eql('_test_');
      // expect(textToHtml('a _ test _ ')).to.eql('a _ test _ ');
    });

    it('should support **...**', () => {
      expect(textToHtml('**test**')).to.eql('<strong>test</strong>');
      expect(textToHtml('**test***')).to.eql('<strong>test</strong>*');
      expect(textToHtml('test **test** test')).to.eql('test <strong>test</strong> test');
      expect(textToHtml('a **test**.')).to.eql('a <strong>test</strong>.');
      expect(textToHtml('a **test.**')).to.eql('a <strong>test.</strong>');
      expect(textToHtml('a **te\\**st**')).to.eql('a <strong>te**st</strong>');
      expect(textToHtml('a **te__st**')).to.eql('a <strong>te__st</strong>');
      expect(textToHtml('a **test__')).to.eql('a **test__');
      expect(textToHtml('\\*\\*test**')).to.eql('**test**');
      // expect(textToHtml('a ** test ** ')).to.eql('a ** test ** ');
    });

    it('should support __...__', () => {
      expect(textToHtml('__test__')).to.eql('<strong>test</strong>');
      expect(textToHtml('__test___')).to.eql('<strong>test</strong>_');
      expect(textToHtml('test __test__ test')).to.eql('test <strong>test</strong> test');
      expect(textToHtml('a __test__.')).to.eql('a <strong>test</strong>.');
      expect(textToHtml('a __test.__')).to.eql('a <strong>test.</strong>');
      expect(textToHtml('a __te\\__st__')).to.eql('a <strong>te__st</strong>');
      expect(textToHtml('a __te**st__')).to.eql('a <strong>te**st</strong>');
      expect(textToHtml('\\_\\_test__')).to.eql('__test__');
      // expect(textToHtml('a __ test __ ')).to.eql('a __ test __ ');
    });

    it('should support []()', () => {
      expect(textToHtml('[link](http://luketurner.org)')).to.eql('<a href="http://luketurner.org">link</a>');
      expect(textToHtml('a [link](http://luketurner.org).')).to.eql('a <a href="http://luketurner.org">link</a>.');
      expect(textToHtml('nota[link](http://luketurner.org)')).to.eql('nota[link](http://luketurner.org)');
      expect(textToHtml('a [li\\[]nk](http://luketurner.org) /a')).to.eql('a <a href="http://luketurner.org">li[]nk</a> /a');
      expect(textToHtml('a [li()nk](http://luketurner.org) /a')).to.eql('a <a href="http://luketurner.org">li()nk</a> /a');
      expect(textToHtml('a: [<>!@#$%^&*()_+{}|[]](http://luketurner.org)')).to.eql('a: <a href="http://luketurner.org"><>!@#$%^&*()_+{}|[]</a>');
    });

    it('should support #tag', () => {
      expect(textToHtml('a: #tag /a')).to.eql('a: <a href="#tag">#tag</a> /a');
      expect(textToHtml('this is a #tag.')).to.eql('this is a <a href="#tag">#tag</a>.');
      expect(textToHtml('this is a #tag')).to.eql('this is a <a href="#tag">#tag</a>');
      expect(textToHtml('this is not a tag, it\'s #3.')).to.eql('this is not a tag, it\'s #3.');
    });

    it('should support `...`', () => {
      expect(textToHtml('`test`')).to.eql('<code>test</code>');
      expect(textToHtml('`test``')).to.eql('<code>test</code>`');
      expect(textToHtml('test `test` test')).to.eql('test <code>test</code> test');
      expect(textToHtml('a `test`.')).to.eql('a <code>test</code>.');
      expect(textToHtml('a `test.`')).to.eql('a <code>test.</code>');
      expect(textToHtml('a `te\\`st`')).to.eql('a <code>te`st</code>');
      expect(textToHtml('a `test')).to.eql('a `test');
      expect(textToHtml('a \\`test`')).to.eql('a `test`');
      // expect(textToHtml('a ` test ` ')).to.eql('a ` test ` ');
    });

    it('should support $...$', () => {
      // TODO -- improve these tests
      expect(textToHtml('$test$')).to.include('katex');
      expect(textToHtml('$te\\$st$')).to.include('katex');
      expect(textToHtml('a $test')).not.to.include('katex');
      // expect(textToHtml('$test$$')).to.eql('<em>test</em>$');
      // expect(textToHtml('test $test$ test')).to.eql('test <em>test</em> test');
      // expect(textToHtml('a $test$.')).to.eql('a <em>test</em>.');
      // expect(textToHtml('a $test.$')).to.eql('a <em>test.</em>');
      // expect(textToHtml('a $te\\$st$')).to.eql('a <em>te$st</em>');
      // expect(textToHtml('a $test_')).to.eql('a $test_');
      // expect(textToHtml('\\$test$')).to.eql('$test$');
      // expect(textToHtml('a $ test $ ')).to.eql('a $ test $ ');
    });
  });
});
