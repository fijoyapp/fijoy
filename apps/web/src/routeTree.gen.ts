/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicRouteImport } from './routes/_public/route'
import { Route as ProtectedRouteImport } from './routes/_protected/route'
import { Route as ProtectedSetupImport } from './routes/_protected/setup'
import { Route as ProtectedProfileRouteImport } from './routes/_protected/_profile/route'
import { Route as ProtectedProfileTransactionsIndexImport } from './routes/_protected/_profile/transactions/index'
import { Route as ProtectedProfileSettingsIndexImport } from './routes/_protected/_profile/settings/index'
import { Route as ProtectedProfileHomeIndexImport } from './routes/_protected/_profile/home/index'
import { Route as ProtectedProfileAccountsIndexImport } from './routes/_protected/_profile/accounts/index'
import { Route as ProtectedProfileSettingsGeneralIndexImport } from './routes/_protected/_profile/settings/general/index'
import { Route as ProtectedProfileSettingsCurrencyIndexImport } from './routes/_protected/_profile/settings/currency/index'

// Create Virtual Routes

const PublicIndexLazyImport = createFileRoute('/_public/')()
const PublicWhyLazyImport = createFileRoute('/_public/why')()
const PublicStackLazyImport = createFileRoute('/_public/stack')()
const PublicSignupLazyImport = createFileRoute('/_public/signup')()
const PublicPricingLazyImport = createFileRoute('/_public/pricing')()
const PublicLoginLazyImport = createFileRoute('/_public/login')()
const PublicFeaturesLazyImport = createFileRoute('/_public/features')()

// Create/Update Routes

const PublicRouteRoute = PublicRouteImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedRouteRoute = ProtectedRouteImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const PublicIndexLazyRoute = PublicIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/index.lazy').then((d) => d.Route))

const PublicWhyLazyRoute = PublicWhyLazyImport.update({
  id: '/why',
  path: '/why',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/why.lazy').then((d) => d.Route))

const PublicStackLazyRoute = PublicStackLazyImport.update({
  id: '/stack',
  path: '/stack',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/stack.lazy').then((d) => d.Route))

const PublicSignupLazyRoute = PublicSignupLazyImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/signup.lazy').then((d) => d.Route),
)

const PublicPricingLazyRoute = PublicPricingLazyImport.update({
  id: '/pricing',
  path: '/pricing',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/pricing.lazy').then((d) => d.Route),
)

const PublicLoginLazyRoute = PublicLoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/login.lazy').then((d) => d.Route))

const PublicFeaturesLazyRoute = PublicFeaturesLazyImport.update({
  id: '/features',
  path: '/features',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/features.lazy').then((d) => d.Route),
)

const ProtectedSetupRoute = ProtectedSetupImport.update({
  id: '/setup',
  path: '/setup',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedProfileRouteRoute = ProtectedProfileRouteImport.update({
  id: '/_profile',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedProfileTransactionsIndexRoute =
  ProtectedProfileTransactionsIndexImport.update({
    id: '/transactions/',
    path: '/transactions/',
    getParentRoute: () => ProtectedProfileRouteRoute,
  } as any)

const ProtectedProfileSettingsIndexRoute =
  ProtectedProfileSettingsIndexImport.update({
    id: '/settings/',
    path: '/settings/',
    getParentRoute: () => ProtectedProfileRouteRoute,
  } as any)

const ProtectedProfileHomeIndexRoute = ProtectedProfileHomeIndexImport.update({
  id: '/home/',
  path: '/home/',
  getParentRoute: () => ProtectedProfileRouteRoute,
} as any)

const ProtectedProfileAccountsIndexRoute =
  ProtectedProfileAccountsIndexImport.update({
    id: '/accounts/',
    path: '/accounts/',
    getParentRoute: () => ProtectedProfileRouteRoute,
  } as any)

const ProtectedProfileSettingsGeneralIndexRoute =
  ProtectedProfileSettingsGeneralIndexImport.update({
    id: '/settings/general/',
    path: '/settings/general/',
    getParentRoute: () => ProtectedProfileRouteRoute,
  } as any)

const ProtectedProfileSettingsCurrencyIndexRoute =
  ProtectedProfileSettingsCurrencyIndexImport.update({
    id: '/settings/currency/',
    path: '/settings/currency/',
    getParentRoute: () => ProtectedProfileRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicRouteImport
      parentRoute: typeof rootRoute
    }
    '/_protected/_profile': {
      id: '/_protected/_profile'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedProfileRouteImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/setup': {
      id: '/_protected/setup'
      path: '/setup'
      fullPath: '/setup'
      preLoaderRoute: typeof ProtectedSetupImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_public/features': {
      id: '/_public/features'
      path: '/features'
      fullPath: '/features'
      preLoaderRoute: typeof PublicFeaturesLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/login': {
      id: '/_public/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLoginLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/pricing': {
      id: '/_public/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof PublicPricingLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/signup': {
      id: '/_public/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof PublicSignupLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/stack': {
      id: '/_public/stack'
      path: '/stack'
      fullPath: '/stack'
      preLoaderRoute: typeof PublicStackLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/why': {
      id: '/_public/why'
      path: '/why'
      fullPath: '/why'
      preLoaderRoute: typeof PublicWhyLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/': {
      id: '/_public/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PublicIndexLazyImport
      parentRoute: typeof PublicRouteImport
    }
    '/_protected/_profile/accounts/': {
      id: '/_protected/_profile/accounts/'
      path: '/accounts'
      fullPath: '/accounts'
      preLoaderRoute: typeof ProtectedProfileAccountsIndexImport
      parentRoute: typeof ProtectedProfileRouteImport
    }
    '/_protected/_profile/home/': {
      id: '/_protected/_profile/home/'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof ProtectedProfileHomeIndexImport
      parentRoute: typeof ProtectedProfileRouteImport
    }
    '/_protected/_profile/settings/': {
      id: '/_protected/_profile/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof ProtectedProfileSettingsIndexImport
      parentRoute: typeof ProtectedProfileRouteImport
    }
    '/_protected/_profile/transactions/': {
      id: '/_protected/_profile/transactions/'
      path: '/transactions'
      fullPath: '/transactions'
      preLoaderRoute: typeof ProtectedProfileTransactionsIndexImport
      parentRoute: typeof ProtectedProfileRouteImport
    }
    '/_protected/_profile/settings/currency/': {
      id: '/_protected/_profile/settings/currency/'
      path: '/settings/currency'
      fullPath: '/settings/currency'
      preLoaderRoute: typeof ProtectedProfileSettingsCurrencyIndexImport
      parentRoute: typeof ProtectedProfileRouteImport
    }
    '/_protected/_profile/settings/general/': {
      id: '/_protected/_profile/settings/general/'
      path: '/settings/general'
      fullPath: '/settings/general'
      preLoaderRoute: typeof ProtectedProfileSettingsGeneralIndexImport
      parentRoute: typeof ProtectedProfileRouteImport
    }
  }
}

// Create and export the route tree

interface ProtectedProfileRouteRouteChildren {
  ProtectedProfileAccountsIndexRoute: typeof ProtectedProfileAccountsIndexRoute
  ProtectedProfileHomeIndexRoute: typeof ProtectedProfileHomeIndexRoute
  ProtectedProfileSettingsIndexRoute: typeof ProtectedProfileSettingsIndexRoute
  ProtectedProfileTransactionsIndexRoute: typeof ProtectedProfileTransactionsIndexRoute
  ProtectedProfileSettingsCurrencyIndexRoute: typeof ProtectedProfileSettingsCurrencyIndexRoute
  ProtectedProfileSettingsGeneralIndexRoute: typeof ProtectedProfileSettingsGeneralIndexRoute
}

const ProtectedProfileRouteRouteChildren: ProtectedProfileRouteRouteChildren = {
  ProtectedProfileAccountsIndexRoute: ProtectedProfileAccountsIndexRoute,
  ProtectedProfileHomeIndexRoute: ProtectedProfileHomeIndexRoute,
  ProtectedProfileSettingsIndexRoute: ProtectedProfileSettingsIndexRoute,
  ProtectedProfileTransactionsIndexRoute:
    ProtectedProfileTransactionsIndexRoute,
  ProtectedProfileSettingsCurrencyIndexRoute:
    ProtectedProfileSettingsCurrencyIndexRoute,
  ProtectedProfileSettingsGeneralIndexRoute:
    ProtectedProfileSettingsGeneralIndexRoute,
}

const ProtectedProfileRouteRouteWithChildren =
  ProtectedProfileRouteRoute._addFileChildren(
    ProtectedProfileRouteRouteChildren,
  )

interface ProtectedRouteRouteChildren {
  ProtectedProfileRouteRoute: typeof ProtectedProfileRouteRouteWithChildren
  ProtectedSetupRoute: typeof ProtectedSetupRoute
}

const ProtectedRouteRouteChildren: ProtectedRouteRouteChildren = {
  ProtectedProfileRouteRoute: ProtectedProfileRouteRouteWithChildren,
  ProtectedSetupRoute: ProtectedSetupRoute,
}

const ProtectedRouteRouteWithChildren = ProtectedRouteRoute._addFileChildren(
  ProtectedRouteRouteChildren,
)

interface PublicRouteRouteChildren {
  PublicFeaturesLazyRoute: typeof PublicFeaturesLazyRoute
  PublicLoginLazyRoute: typeof PublicLoginLazyRoute
  PublicPricingLazyRoute: typeof PublicPricingLazyRoute
  PublicSignupLazyRoute: typeof PublicSignupLazyRoute
  PublicStackLazyRoute: typeof PublicStackLazyRoute
  PublicWhyLazyRoute: typeof PublicWhyLazyRoute
  PublicIndexLazyRoute: typeof PublicIndexLazyRoute
}

const PublicRouteRouteChildren: PublicRouteRouteChildren = {
  PublicFeaturesLazyRoute: PublicFeaturesLazyRoute,
  PublicLoginLazyRoute: PublicLoginLazyRoute,
  PublicPricingLazyRoute: PublicPricingLazyRoute,
  PublicSignupLazyRoute: PublicSignupLazyRoute,
  PublicStackLazyRoute: PublicStackLazyRoute,
  PublicWhyLazyRoute: PublicWhyLazyRoute,
  PublicIndexLazyRoute: PublicIndexLazyRoute,
}

const PublicRouteRouteWithChildren = PublicRouteRoute._addFileChildren(
  PublicRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof ProtectedProfileRouteRouteWithChildren
  '/setup': typeof ProtectedSetupRoute
  '/features': typeof PublicFeaturesLazyRoute
  '/login': typeof PublicLoginLazyRoute
  '/pricing': typeof PublicPricingLazyRoute
  '/signup': typeof PublicSignupLazyRoute
  '/stack': typeof PublicStackLazyRoute
  '/why': typeof PublicWhyLazyRoute
  '/': typeof PublicIndexLazyRoute
  '/accounts': typeof ProtectedProfileAccountsIndexRoute
  '/home': typeof ProtectedProfileHomeIndexRoute
  '/settings': typeof ProtectedProfileSettingsIndexRoute
  '/transactions': typeof ProtectedProfileTransactionsIndexRoute
  '/settings/currency': typeof ProtectedProfileSettingsCurrencyIndexRoute
  '/settings/general': typeof ProtectedProfileSettingsGeneralIndexRoute
}

export interface FileRoutesByTo {
  '': typeof ProtectedProfileRouteRouteWithChildren
  '/setup': typeof ProtectedSetupRoute
  '/features': typeof PublicFeaturesLazyRoute
  '/login': typeof PublicLoginLazyRoute
  '/pricing': typeof PublicPricingLazyRoute
  '/signup': typeof PublicSignupLazyRoute
  '/stack': typeof PublicStackLazyRoute
  '/why': typeof PublicWhyLazyRoute
  '/': typeof PublicIndexLazyRoute
  '/accounts': typeof ProtectedProfileAccountsIndexRoute
  '/home': typeof ProtectedProfileHomeIndexRoute
  '/settings': typeof ProtectedProfileSettingsIndexRoute
  '/transactions': typeof ProtectedProfileTransactionsIndexRoute
  '/settings/currency': typeof ProtectedProfileSettingsCurrencyIndexRoute
  '/settings/general': typeof ProtectedProfileSettingsGeneralIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_protected': typeof ProtectedRouteRouteWithChildren
  '/_public': typeof PublicRouteRouteWithChildren
  '/_protected/_profile': typeof ProtectedProfileRouteRouteWithChildren
  '/_protected/setup': typeof ProtectedSetupRoute
  '/_public/features': typeof PublicFeaturesLazyRoute
  '/_public/login': typeof PublicLoginLazyRoute
  '/_public/pricing': typeof PublicPricingLazyRoute
  '/_public/signup': typeof PublicSignupLazyRoute
  '/_public/stack': typeof PublicStackLazyRoute
  '/_public/why': typeof PublicWhyLazyRoute
  '/_public/': typeof PublicIndexLazyRoute
  '/_protected/_profile/accounts/': typeof ProtectedProfileAccountsIndexRoute
  '/_protected/_profile/home/': typeof ProtectedProfileHomeIndexRoute
  '/_protected/_profile/settings/': typeof ProtectedProfileSettingsIndexRoute
  '/_protected/_profile/transactions/': typeof ProtectedProfileTransactionsIndexRoute
  '/_protected/_profile/settings/currency/': typeof ProtectedProfileSettingsCurrencyIndexRoute
  '/_protected/_profile/settings/general/': typeof ProtectedProfileSettingsGeneralIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/setup'
    | '/features'
    | '/login'
    | '/pricing'
    | '/signup'
    | '/stack'
    | '/why'
    | '/'
    | '/accounts'
    | '/home'
    | '/settings'
    | '/transactions'
    | '/settings/currency'
    | '/settings/general'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/setup'
    | '/features'
    | '/login'
    | '/pricing'
    | '/signup'
    | '/stack'
    | '/why'
    | '/'
    | '/accounts'
    | '/home'
    | '/settings'
    | '/transactions'
    | '/settings/currency'
    | '/settings/general'
  id:
    | '__root__'
    | '/_protected'
    | '/_public'
    | '/_protected/_profile'
    | '/_protected/setup'
    | '/_public/features'
    | '/_public/login'
    | '/_public/pricing'
    | '/_public/signup'
    | '/_public/stack'
    | '/_public/why'
    | '/_public/'
    | '/_protected/_profile/accounts/'
    | '/_protected/_profile/home/'
    | '/_protected/_profile/settings/'
    | '/_protected/_profile/transactions/'
    | '/_protected/_profile/settings/currency/'
    | '/_protected/_profile/settings/general/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProtectedRouteRoute: typeof ProtectedRouteRouteWithChildren
  PublicRouteRoute: typeof PublicRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  ProtectedRouteRoute: ProtectedRouteRouteWithChildren,
  PublicRouteRoute: PublicRouteRouteWithChildren,
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
        "/_protected",
        "/_public"
      ]
    },
    "/_protected": {
      "filePath": "_protected/route.tsx",
      "children": [
        "/_protected/_profile",
        "/_protected/setup"
      ]
    },
    "/_public": {
      "filePath": "_public/route.tsx",
      "children": [
        "/_public/features",
        "/_public/login",
        "/_public/pricing",
        "/_public/signup",
        "/_public/stack",
        "/_public/why",
        "/_public/"
      ]
    },
    "/_protected/_profile": {
      "filePath": "_protected/_profile/route.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/_profile/accounts/",
        "/_protected/_profile/home/",
        "/_protected/_profile/settings/",
        "/_protected/_profile/transactions/",
        "/_protected/_profile/settings/currency/",
        "/_protected/_profile/settings/general/"
      ]
    },
    "/_protected/setup": {
      "filePath": "_protected/setup.tsx",
      "parent": "/_protected"
    },
    "/_public/features": {
      "filePath": "_public/features.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/login": {
      "filePath": "_public/login.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/pricing": {
      "filePath": "_public/pricing.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/signup": {
      "filePath": "_public/signup.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/stack": {
      "filePath": "_public/stack.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/why": {
      "filePath": "_public/why.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/": {
      "filePath": "_public/index.lazy.tsx",
      "parent": "/_public"
    },
    "/_protected/_profile/accounts/": {
      "filePath": "_protected/_profile/accounts/index.tsx",
      "parent": "/_protected/_profile"
    },
    "/_protected/_profile/home/": {
      "filePath": "_protected/_profile/home/index.tsx",
      "parent": "/_protected/_profile"
    },
    "/_protected/_profile/settings/": {
      "filePath": "_protected/_profile/settings/index.tsx",
      "parent": "/_protected/_profile"
    },
    "/_protected/_profile/transactions/": {
      "filePath": "_protected/_profile/transactions/index.tsx",
      "parent": "/_protected/_profile"
    },
    "/_protected/_profile/settings/currency/": {
      "filePath": "_protected/_profile/settings/currency/index.tsx",
      "parent": "/_protected/_profile"
    },
    "/_protected/_profile/settings/general/": {
      "filePath": "_protected/_profile/settings/general/index.tsx",
      "parent": "/_protected/_profile"
    }
  }
}
ROUTE_MANIFEST_END */
