const test = require('ava');
const _ = require('lodash');
const unionGenerator = require('../../../../lib/generator/compiler/union');

test('unionGenerator', (t) => {
  const fields = [
    {
      id: '1',
      option: null,
      fieldType: {
        type: 'list',
        fieldType: 'Bonk'
      },
      identifier: 'bonks',
      defaultValue: null
    },
    {
      id: '2',
      option: null,
      fieldType: 'Bonk',
      identifier: 'bonk',
      defaultValue: null
    },
    {
      id: '3',
      option: null,
      fieldType: 'i8',
      identifier: 'newbyte',
      defaultValue: null
    },
    {
      id: '4',
      option: null,
      fieldType: 'i16',
      identifier: 'newshort',
      defaultValue: 123
    },
    {
      id: '5',
      option: null,
      fieldType: {
        type: 'set',
        fieldType: 'Bonk'
      },
      identifier: 'my_set',
      defaultValue: null
    },
    {
      id: '6',
      option: null,
      fieldType: {
        type: 'map',
        keyFieldType: 'i32',
        valueFieldType: {
          type: 'list',
          fieldType: 'Numbers'
        }
      },
      identifier: 'types',
      defaultValue: null
    }];

  const options = {
    moduleFormat: 'esm',
    fieldFormatter: _.camelCase
  };

  const esmStr = unionGenerator('TestUnion', 'Struct', fields, options);
  t.snapshot(esmStr);
  const cjsOptions = {
    moduleFormat: 'cjs',
    fieldFormatter: _.toUpper
  };

  const cjsStr = unionGenerator('TestUnion', 'Struct', fields, cjsOptions);
  t.snapshot(cjsStr);

  const defaultStr = unionGenerator('TestUnion', 'Struct', fields);
  t.snapshot(defaultStr);
});

