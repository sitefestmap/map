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
    "@mapbox/mapbox-gl-directions": "^4.1.1",
    "@mapbox/mapbox-sdk": "^0.15.1",
    "mapbox-gl": "^2.14.1",
    "vite": "^4.3.8"
  }
}
```

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