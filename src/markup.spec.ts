import { htmlToText, textToHtml } from './markup';

import { expect } from 'chai';

import { describe, it } from 'mocha';

describe('markup', () => {

  describe('.htmlToText', () => {
    it('should not change unformatted text', () => {
      expect(htmlToText('hi there, this is some text. <>!@#$%^&*()_+{}|[]')).to.eql('hi there, this is some text. <>!@#$%^&*()_+{}|[]');
    });

    it('should convert <em> to _', () => {
      expect(htmlToText('emphasis: <em>mine<>!@#$%^&*()_+{}|[]</em> /emphasis')).to.eql('emphasis: _mine<>!@#$%^&*()_+{}|[]_ /emphasis');
    });

    it('should convert <strong> to *', () => {
      expect(htmlToText('emphasis: <strong>mine<>!@#$%^&*()_+{}|[]</strong> /emphasis')).to.eql('emphasis: *mine<>!@#$%^&*()_+{}|[]* /emphasis');
    });

    it('should convert <a href=""> to []()', () => {
      expect(htmlToText('a: <a href="http://luketurner.org">link<>!@#$%^&*()_+{}|[]</a> /a')).to.eql('a: [link<>!@#$%^&*()_+{}|[]](http://luketurner.org) /a');
    });

    it('should convert <a href="#tag"> to #tag', () => {
      expect(htmlToText('a: <a href="#tag">#tag</a> /a')).to.eql('a: #tag /a');
    });
  });

  describe('.textToHtml', () => {
    it('should not change unformatted text', () => {
      expect(textToHtml('hi there, this is some text. <>!@#$%^&*()_+{}|[]')).to.eql('hi there, this is some text. <>!@#$%^&*()_+{}|[]');
    });

    it('should support _', () => {
      expect(textToHtml('emphasis: _mine<>!@#$%^&*()_+{}|[]_ /emphasis')).to.eql('emphasis: <em>mine<>!@#$%^&*()_+{}|[]</em> /emphasis');
    });

    it('should support *', () => {
      expect(textToHtml('emphasis: *mine<>!@#$%^&*()_+{}|[]* /emphasis')).to.eql('emphasis: <strong>mine<>!@#$%^&*()_+{}|[]</strong> /emphasis');
    });

    it('should support []()', () => {
      expect(textToHtml('a: [link<>!@#$%^&*()_+{}|[]](http://luketurner.org) /a')).to.eql('a: <a href="http://luketurner.org">link<>!@#$%^&*()_+{}|[]</a> /a');
    });

    it('should support #tag', () => {
      expect(textToHtml('a: #tag /a')).to.eql('a: <a href="#tag">#tag</a> /a');
      expect(textToHtml('this is a #tag.')).to.eql('this is a <a href="#tag">#tag</a>.');
      expect(textToHtml('this is a #tag')).to.eql('this is a <a href="#tag">#tag</a>');
      expect(textToHtml('this is not a tag, it\'s #3.')).to.eql('this is not a tag, it\'s #3.');
    });
  });
});
