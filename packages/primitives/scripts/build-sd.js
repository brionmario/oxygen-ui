#!/usr/bin/env node
/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @fileoverview Build script to generate the Style Dictionary output.
 */

const fs = require('fs');
const path = require('path');
const { logger } = require('@oxygen-ui-experimental/logger');
const StyleDictionary = require('style-dictionary');

const PATHS = {
  source: {
    tokens: path.resolve(path.join(__dirname, '..', 'src', 'design-tokens')),
  },
};

StyleDictionary.registerTransformGroup({
  name: 'tokens-es',
  transforms: ['name/cti/pascal', 'size/px', 'color/hex'],
});

StyleDictionary.registerTransformGroup({
  name: 'tokens-scss',
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css'],
});

StyleDictionary.registerTransformGroup({
  name: 'tokens-css',
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css'],
});

const getStyleDictionaryConfig = (brand, source) => {
  const sourceFileName = path.basename(source);

  return {
    platforms: {
      'web/css': {
        buildPath: `dist/design-tokens/web/${brand}/css/`,
        files: [
          {
            destination: sourceFileName.replace('.json', '.css'),
            format: 'css/variables',
          },
        ],
        prefix: brand,
        transformGroup: 'tokens-css',
      },
      'web/es': {
        buildPath: `dist/design-tokens/web/${brand}/es/`,
        files: [
          {
            destination: sourceFileName.replace('.json', '.d.ts'),
            format: 'typescript/es6-declarations',
          },
          {
            destination: sourceFileName.replace('.json', '.js'),
            format: 'javascript/module-flat',
          },
          {
            destination: sourceFileName.replace('.json', '.es6.js'),
            format: 'javascript/es6',
          },
        ],
        prefix: brand,
        transformGroup: 'tokens-es',
      },
      'web/scss': {
        buildPath: `dist/design-tokens/web/${brand}/scss/`,
        files: [
          {
            destination: sourceFileName.replace('.json', '.scss'),
            format: 'scss/variables',
          },
        ],
        prefix: brand,
        transformGroup: 'tokens-scss',
      },
    },
    source: [source],
  };
};

fs.readdirSync(PATHS.source.tokens)
  .forEach((brand) => {
    logger.info(`Processing the Brand: [ ${brand} ]`);

    fs.readdirSync(path.join(PATHS.source.tokens, brand))
      .forEach((tokenFile) => {
        const filePath = path.join(PATHS.source.tokens, brand, tokenFile);

        const StyleDictionaryExtended = StyleDictionary
          .extend(getStyleDictionaryConfig(brand, filePath));

        StyleDictionaryExtended.buildPlatform('web/es');
        StyleDictionaryExtended.buildPlatform('web/css');
        StyleDictionaryExtended.buildPlatform('web/scss');
      });
  });
