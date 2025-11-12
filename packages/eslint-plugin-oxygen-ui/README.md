# @brionmario-experimental/eslint-plugin-oxygen-ui

ESLint plugin to enforce Oxygen UI best practices by preventing direct imports from `@mui/*` packages and `lucide-react`.

## Installation

```bash
npm install --save-dev @brionmario-experimental/eslint-plugin-oxygen-ui
# or
pnpm add -D @brionmario-experimental/eslint-plugin-oxygen-ui
# or
yarn add -D @brionmario-experimental/eslint-plugin-oxygen-ui
```

## Usage

### Flat Config (ESLint 9+)

```javascript
import oxygenUIPlugin from '@brionmario-experimental/eslint-plugin-oxygen-ui';

export default [
  {
    plugins: {
      '@brionmario-experimental/oxygen-ui': oxygenUIPlugin,
    },
    rules: {
      '@brionmario-experimental/oxygen-ui/no-direct-mui-imports': 'error',
      '@brionmario-experimental/oxygen-ui/no-direct-lucide-imports': 'error',
    },
  },
];
```

Or use the recommended config:

```javascript
import oxygenUIPlugin from '@brionmario-experimental/eslint-plugin-oxygen-ui';

export default [
  oxygenUIPlugin.configs.recommended,
];
```

## Rules

### `no-direct-mui-imports`

Prevents direct imports from all MUI packages (`@mui/*`) and suggests using `@oxygen-ui/react` instead.

❌ **Incorrect:**
```javascript
import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
```

✅ **Correct:**
```javascript
// Standard Material-UI components
import { Box, Stack, Button } from '@brionmario-experimental/oxygen-ui';

// MUI X Data Grid components (namespace export)
import { DataGrid } from '@brionmario-experimental/oxygen-ui';
// Then destructure specific components:
const { DataGrid: DataGridComponent, GridColDef } = DataGrid;

// MUI X Date Pickers components (namespace export)
import { DatePickers } from '@brionmario-experimental/oxygen-ui';
// Then destructure specific components:
const { DatePicker, LocalizationProvider } = DatePickers;
```

**Options:**
- `suggestedPackage` (string): The package to suggest instead of @mui/* (default: '@brionmario-experimental/oxygen-ui')
- `allowedPackages` (array): List of MUI packages that are allowed (default: [])

### `no-direct-lucide-imports`

Prevents direct imports from `lucide-react` and suggests using `@brionmario-experimental/oxygen-ui-icons-react` instead.

❌ **Incorrect:**
```javascript
import { Settings, Home, User } from 'lucide-react';
```

✅ **Correct:**
```javascript
import { Settings, Home, User } from '@brionmario-experimental/oxygen-ui-icons-react';
```

**Options:**
- `suggestedPackage` (string): The package to suggest instead of lucide-react (default: '@brionmario-experimental/oxygen-ui-icons-react')

## Auto-fixing

Both rules support auto-fixing with `eslint --fix`.

## License

Apache-2.0 © WSO2 LLC
