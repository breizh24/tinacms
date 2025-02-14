/**

Copyright 2021 Forestry.io Holdings, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
import { describe, it, expect } from 'vitest'
import { field, output, parseMDX, stringifyMDX } from './_config'
import markdownString from './kitchen sink.md?raw'

const out = output({
  type: 'root',
  children: [
    { type: 'p', children: [{ type: 'text', text: 'This is a paragraph.' }] },
    { type: 'h1', children: [{ type: 'text', text: 'Header 1' }] },
    { type: 'h2', children: [{ type: 'text', text: 'Header 2' }] },
    { type: 'h3', children: [{ type: 'text', text: 'Header 3' }] },
    { type: 'h4', children: [{ type: 'text', text: 'Header 4' }] },
    { type: 'h5', children: [{ type: 'text', text: 'Header 5' }] },
    { type: 'h6', children: [{ type: 'text', text: 'Header 6' }] },
    {
      type: 'blockquote',
      children: [
        {
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
        },
      ],
    },
    {
      type: 'ul',
      children: [
        {
          type: 'li',
          children: [
            { type: 'lic', children: [{ type: 'text', text: 'Red' }] },
          ],
        },
        {
          type: 'li',
          children: [
            { type: 'lic', children: [{ type: 'text', text: 'Green' }] },
          ],
        },
        {
          type: 'li',
          children: [
            { type: 'lic', children: [{ type: 'text', text: 'Blue' }] },
          ],
        },
      ],
    },
    {
      type: 'code_block',
      lang: 'markdown',
      value: '- Red\n- Green\n- Blue',
      children: [{ type: 'text', text: '' }],
    },
    {
      type: 'ol',
      children: [
        {
          type: 'li',
          children: [
            {
              type: 'lic',
              children: [{ type: 'text', text: 'Buy flour and salt' }],
            },
          ],
        },
        {
          type: 'li',
          children: [
            {
              type: 'lic',
              children: [{ type: 'text', text: 'Mix together with water' }],
            },
          ],
        },
        {
          type: 'li',
          children: [
            { type: 'lic', children: [{ type: 'text', text: 'Bake' }] },
          ],
        },
      ],
    },
    { type: 'hr', children: [{ type: 'text', text: '' }] },
    {
      type: 'p',
      children: [
        { type: 'text', text: 'This is ' },
        {
          type: 'a',
          url: 'http://example.com',
          title: 'Example',
          children: [{ type: 'text', text: 'an example' }],
        },
        { type: 'text', text: ' link.' },
      ],
    },
    {
      type: 'p',
      children: [
        {
          type: 'a',
          url: 'http://example.com',
          title: null,
          children: [{ type: 'text', text: 'This link' }],
        },
        { type: 'text', text: ' has no title attr.' },
      ],
    },
    {
      type: 'p',
      children: [{ type: 'text', text: 'single asterisks', italic: true }],
    },
    {
      type: 'p',
      children: [{ type: 'text', text: 'double asterisks', bold: true }],
    },
    {
      type: 'p',
      children: [
        { type: 'text', text: 'This paragraph has some ' },
        { type: 'text', text: 'code', code: true },
        { type: 'text', text: ' in it.' },
      ],
    },
    {
      type: 'img',
      url: 'https://get.svg.workers.dev',
      alt: 'Alt Text',
      caption: 'Image Title',
      children: [{ type: 'text', text: '' }],
    },
    {
      type: 'p',
      children: [
        { type: 'text', text: 'This is a ' },
        { type: 'text', text: 'paragraph with ', bold: true },
        { type: 'text', text: 'nested', bold: true, italic: true },
        { type: 'text', text: ' emphasis', bold: true },
        { type: 'text', text: '.' },
      ],
    },
    {
      type: 'p',
      children: [
        { type: 'text', text: 'This is a ' },
        {
          type: 'a',
          url: 'http://example.com',
          title: null,
          children: [{ type: 'text', text: 'link in code', code: true }],
        },
      ],
    },
    {
      type: 'p',
      children: [
        { type: 'text', text: 'This is a ' },
        {
          type: 'a',
          url: 'http://example.com',
          title: null,
          children: [
            { type: 'text', text: 'bold mark', italic: true },
            { type: 'text', text: ' in a link' },
          ],
        },
      ],
    },
  ],
})

describe('./kitchen sink.md', () => {
  it('parses the string in the expected AST', () => {
    expect(parseMDX(markdownString, field, (v) => v)).toMatchObject(out)
  })
  it('stringifies the AST into the expect string', () => {
    expect(stringifyMDX(out, field, (v) => v)).toEqual(markdownString)
  })
})
