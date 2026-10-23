import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../dist/to-top.mjs', import.meta.url), 'utf8');
function setup(reduced = false) {
  const events = {}, clicks = {}, classes = new Set(), attributes = {};
  const state = {controls: [], scroll: null, focused: null};
  const heading = {setAttribute: (key, value) => attributes[key] = value,
    focus: (options) => {state.focused = options; document.activeElement = heading;}};
  const button = {hidden: true, setAttribute: (key, value) => attributes[key] = value,
    addEventListener: (event, listener) => clicks[event] = listener,
    classList: {toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name)},
    getBoundingClientRect: () => ({left: classes.has('to-top-left') ? 16 : 264,
      right: classes.has('to-top-left') ? 126 : 374, top: 780, bottom: 828})};
  const document = {activeElement: null, body: {append: () => {}}, createElement: () => button,
    querySelectorAll: () => state.controls, querySelector: () => heading,
    addEventListener: (event, listener) => events[event] = listener};
  const window = {scrollY: 0, addEventListener: (event, listener) => events[event] = listener,
    matchMedia: () => ({matches: reduced}), scrollTo: (options) => state.scroll = options};
  vm.runInNewContext(source, {document, window, requestAnimationFrame: (callback) => callback()});
  const control = (rect) => ({getClientRects: () => [rect], getBoundingClientRect: () => rect});
  return {button, window, document, events, clicks, classes, attributes, state, heading, control};
}

test('floating control appears after scrolling and avoids occupied phone corners', () => {
  const p = setup();
  assert.equal(p.button.hidden, true);
  p.window.scrollY = 700; p.events.scroll();
  assert.equal(p.button.hidden, false);
  assert.equal(p.attributes['aria-label'], 'To top');
  p.state.controls = [p.control({left: 250, right: 390, top: 770, bottom: 840})];
  p.events.scroll();
  assert.ok(p.classes.has('to-top-left'));
  assert.equal(p.button.hidden, false);
  p.state.controls = [p.control({left: 0, right: 390, top: 770, bottom: 840})];
  p.events.scroll();
  assert.equal(p.button.hidden, true, 'Full-width form/export/reset controls remain unobscured.');
  p.state.controls = []; p.events.scroll();
  assert.equal(p.button.hidden, false);
  p.window.scrollY = 0; p.events.scroll();
  assert.equal(p.button.hidden, true);
});

for (const reduced of [false, true]) test(`activation returns keyboard focus to the heading; reduced motion ${reduced}`, () => {
  const p = setup(reduced);
  p.window.scrollY = 900; p.events.scroll();
  p.document.activeElement = p.button;
  p.events.focusin();
  assert.equal(p.button.hidden, false, 'The focused control remains available for activation.');
  p.clicks.click();
  assert.equal(p.document.activeElement, p.heading);
  assert.equal(p.attributes.tabindex, '-1');
  assert.equal(p.state.focused.preventScroll, true);
  assert.equal(p.state.scroll.top, 0);
  assert.equal(p.state.scroll.behavior, reduced ? 'instant' : 'smooth');
});
