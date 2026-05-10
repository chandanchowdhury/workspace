/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { logToFile } from './logger';

export interface WorkspaceConfig {
  clientId: string;
  clientSecret: string;
  cloudFunctionUrl: string;
}

const DEFAULT_CONFIG: WorkspaceConfig = {
  clientId:
    '338689075775-o75k922vn5fdl18qergr96rp8g63e4d7.apps.googleusercontent.com',
  cloudFunctionUrl: 'https://google-workspace-extension.geminicli.com',
  clientSecret: '',
};

/**
 * Loads the configuration. Currently uses defaults, but can be extended
 * to read from environment variables or a configuration file.
 */
export function loadConfig(): WorkspaceConfig {
  const config: WorkspaceConfig = {
    clientId: process.env['WORKSPACE_CLIENT_ID'] || DEFAULT_CONFIG.clientId,
    cloudFunctionUrl:
      process.env['WORKSPACE_CLOUD_FUNCTION_URL'] ||
      DEFAULT_CONFIG.cloudFunctionUrl,
    clientSecret: process.env['WORKSPACE_CLIENT_SECRET'] || DEFAULT_CONFIG.clientSecret,
  };

  const maskedClientId =
    config.clientId.length > 2
      ? `...${config.clientId.slice(-2)}`
      : config.clientId;
  logToFile(
    `Loaded config: clientId=${maskedClientId}, cloudFunctionUrl=${config.cloudFunctionUrl}, localAuth=${!!config.clientSecret}`,
  );
  return config;
}
