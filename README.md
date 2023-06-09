# SVA Site Festival Map 

## Dependancies

```sh
# if need to pull the repo and install dependancies
npm install
```

```json
{
  "scripts": {
    "dev": "vite dev --port 3103",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mapbox/mapbox-sdk": "^0.15.1",
    "mapbox-gl": "^2.14.1",
    "vite": "^4.3.8"
  }
}
```

The mapbox/mapbox-directions goes in the `<head>` to prevent dep conflict error.

## Vite Config

Config for Vanilla JS Multi-page apps in Vite, where there are multiple HTML files in the root folder.

```sh
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        next: resolve(__dirname, 'index2.html'),
      },
    },
  },
})
```

## Static Assets

[Vite Public Dir](https://vitejs.dev/guide/assets.html#the-public-directory)

## Styles

[Transfer Styles between accounts](https://docs.mapbox.com/help/troubleshooting/transfer-styles-between-accounts/)