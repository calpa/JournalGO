/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as EncryptImport } from './routes/encrypt'
import { Route as DecryptImport } from './routes/decrypt'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as EntryIndexImport } from './routes/entry/index'
import { Route as EntryEntryIdImport } from './routes/entry/$entryId'

// Create/Update Routes

const EncryptRoute = EncryptImport.update({
  id: '/encrypt',
  path: '/encrypt',
  getParentRoute: () => rootRoute,
} as any)

const DecryptRoute = DecryptImport.update({
  id: '/decrypt',
  path: '/decrypt',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const EntryIndexRoute = EntryIndexImport.update({
  id: '/entry/',
  path: '/entry/',
  getParentRoute: () => rootRoute,
} as any)

const EntryEntryIdRoute = EntryEntryIdImport.update({
  id: '/entry/$entryId',
  path: '/entry/$entryId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/decrypt': {
      id: '/decrypt'
      path: '/decrypt'
      fullPath: '/decrypt'
      preLoaderRoute: typeof DecryptImport
      parentRoute: typeof rootRoute
    }
    '/encrypt': {
      id: '/encrypt'
      path: '/encrypt'
      fullPath: '/encrypt'
      preLoaderRoute: typeof EncryptImport
      parentRoute: typeof rootRoute
    }
    '/entry/$entryId': {
      id: '/entry/$entryId'
      path: '/entry/$entryId'
      fullPath: '/entry/$entryId'
      preLoaderRoute: typeof EntryEntryIdImport
      parentRoute: typeof rootRoute
    }
    '/entry/': {
      id: '/entry/'
      path: '/entry'
      fullPath: '/entry'
      preLoaderRoute: typeof EntryIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/decrypt': typeof DecryptRoute
  '/encrypt': typeof EncryptRoute
  '/entry/$entryId': typeof EntryEntryIdRoute
  '/entry': typeof EntryIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/decrypt': typeof DecryptRoute
  '/encrypt': typeof EncryptRoute
  '/entry/$entryId': typeof EntryEntryIdRoute
  '/entry': typeof EntryIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/decrypt': typeof DecryptRoute
  '/encrypt': typeof EncryptRoute
  '/entry/$entryId': typeof EntryEntryIdRoute
  '/entry/': typeof EntryIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/decrypt'
    | '/encrypt'
    | '/entry/$entryId'
    | '/entry'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/dashboard'
    | '/decrypt'
    | '/encrypt'
    | '/entry/$entryId'
    | '/entry'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/decrypt'
    | '/encrypt'
    | '/entry/$entryId'
    | '/entry/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRoute
  DecryptRoute: typeof DecryptRoute
  EncryptRoute: typeof EncryptRoute
  EntryEntryIdRoute: typeof EntryEntryIdRoute
  EntryIndexRoute: typeof EntryIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  DecryptRoute: DecryptRoute,
  EncryptRoute: EncryptRoute,
  EntryEntryIdRoute: EntryEntryIdRoute,
  EntryIndexRoute: EntryIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/decrypt",
        "/encrypt",
        "/entry/$entryId",
        "/entry/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/decrypt": {
      "filePath": "decrypt.tsx"
    },
    "/encrypt": {
      "filePath": "encrypt.tsx"
    },
    "/entry/$entryId": {
      "filePath": "entry/$entryId.tsx"
    },
    "/entry/": {
      "filePath": "entry/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
