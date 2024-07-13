/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicRouteImport } from './routes/_public/route'
import { Route as ProtectedRouteImport } from './routes/_protected/route'
import { Route as ProtectedSetupImport } from './routes/_protected/setup'
import { Route as ProtectedWorkspaceIndexImport } from './routes/_protected/workspace/index'
import { Route as ProtectedWorkspaceNamespaceRouteImport } from './routes/_protected/workspace/$namespace/route'
import { Route as ProtectedWorkspaceNamespaceIndexImport } from './routes/_protected/workspace/$namespace/index'
import { Route as ProtectedWorkspaceNamespaceTransactionsIndexImport } from './routes/_protected/workspace/$namespace/transactions/index'
import { Route as ProtectedWorkspaceNamespaceStocksIndexImport } from './routes/_protected/workspace/$namespace/stocks/index'
import { Route as ProtectedWorkspaceNamespaceSettingsIndexImport } from './routes/_protected/workspace/$namespace/settings/index'
import { Route as ProtectedWorkspaceNamespaceAccountsIndexImport } from './routes/_protected/workspace/$namespace/accounts/index'
import { Route as ProtectedWorkspaceNamespaceSettingsUsersIndexImport } from './routes/_protected/workspace/$namespace/settings/users/index'
import { Route as ProtectedWorkspaceNamespaceSettingsGeneralIndexImport } from './routes/_protected/workspace/$namespace/settings/general/index'
import { Route as ProtectedWorkspaceNamespaceSettingsCurrencyIndexImport } from './routes/_protected/workspace/$namespace/settings/currency/index'
import { Route as ProtectedWorkspaceNamespaceSettingsCategoriesIndexImport } from './routes/_protected/workspace/$namespace/settings/categories/index'
import { Route as ProtectedWorkspaceNamespaceAccountsAccountIdIndexImport } from './routes/_protected/workspace/$namespace/accounts/$accountId/index'

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
  path: '/',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/index.lazy').then((d) => d.Route))

const PublicWhyLazyRoute = PublicWhyLazyImport.update({
  path: '/why',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/why.lazy').then((d) => d.Route))

const PublicStackLazyRoute = PublicStackLazyImport.update({
  path: '/stack',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/stack.lazy').then((d) => d.Route))

const PublicSignupLazyRoute = PublicSignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/signup.lazy').then((d) => d.Route),
)

const PublicPricingLazyRoute = PublicPricingLazyImport.update({
  path: '/pricing',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/pricing.lazy').then((d) => d.Route),
)

const PublicLoginLazyRoute = PublicLoginLazyImport.update({
  path: '/login',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() => import('./routes/_public/login.lazy').then((d) => d.Route))

const PublicFeaturesLazyRoute = PublicFeaturesLazyImport.update({
  path: '/features',
  getParentRoute: () => PublicRouteRoute,
} as any).lazy(() =>
  import('./routes/_public/features.lazy').then((d) => d.Route),
)

const ProtectedSetupRoute = ProtectedSetupImport.update({
  path: '/setup',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedWorkspaceIndexRoute = ProtectedWorkspaceIndexImport.update({
  path: '/workspace/',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProtectedWorkspaceNamespaceRouteRoute =
  ProtectedWorkspaceNamespaceRouteImport.update({
    path: '/workspace/$namespace',
    getParentRoute: () => ProtectedRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceIndexRoute =
  ProtectedWorkspaceNamespaceIndexImport.update({
    path: '/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceTransactionsIndexRoute =
  ProtectedWorkspaceNamespaceTransactionsIndexImport.update({
    path: '/transactions/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceStocksIndexRoute =
  ProtectedWorkspaceNamespaceStocksIndexImport.update({
    path: '/stocks/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceSettingsIndexRoute =
  ProtectedWorkspaceNamespaceSettingsIndexImport.update({
    path: '/settings/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceAccountsIndexRoute =
  ProtectedWorkspaceNamespaceAccountsIndexImport.update({
    path: '/accounts/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceSettingsUsersIndexRoute =
  ProtectedWorkspaceNamespaceSettingsUsersIndexImport.update({
    path: '/settings/users/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceSettingsGeneralIndexRoute =
  ProtectedWorkspaceNamespaceSettingsGeneralIndexImport.update({
    path: '/settings/general/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceSettingsCurrencyIndexRoute =
  ProtectedWorkspaceNamespaceSettingsCurrencyIndexImport.update({
    path: '/settings/currency/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceSettingsCategoriesIndexRoute =
  ProtectedWorkspaceNamespaceSettingsCategoriesIndexImport.update({
    path: '/settings/categories/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
  } as any)

const ProtectedWorkspaceNamespaceAccountsAccountIdIndexRoute =
  ProtectedWorkspaceNamespaceAccountsAccountIdIndexImport.update({
    path: '/accounts/$accountId/',
    getParentRoute: () => ProtectedWorkspaceNamespaceRouteRoute,
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
    '/_protected/workspace/$namespace': {
      id: '/_protected/workspace/$namespace'
      path: '/workspace/$namespace'
      fullPath: '/workspace/$namespace'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceRouteImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/workspace/': {
      id: '/_protected/workspace/'
      path: '/workspace'
      fullPath: '/workspace'
      preLoaderRoute: typeof ProtectedWorkspaceIndexImport
      parentRoute: typeof ProtectedRouteImport
    }
    '/_protected/workspace/$namespace/': {
      id: '/_protected/workspace/$namespace/'
      path: '/'
      fullPath: '/workspace/$namespace/'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/accounts/': {
      id: '/_protected/workspace/$namespace/accounts/'
      path: '/accounts'
      fullPath: '/workspace/$namespace/accounts'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceAccountsIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/settings/': {
      id: '/_protected/workspace/$namespace/settings/'
      path: '/settings'
      fullPath: '/workspace/$namespace/settings'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceSettingsIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/stocks/': {
      id: '/_protected/workspace/$namespace/stocks/'
      path: '/stocks'
      fullPath: '/workspace/$namespace/stocks'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceStocksIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/transactions/': {
      id: '/_protected/workspace/$namespace/transactions/'
      path: '/transactions'
      fullPath: '/workspace/$namespace/transactions'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceTransactionsIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/accounts/$accountId/': {
      id: '/_protected/workspace/$namespace/accounts/$accountId/'
      path: '/accounts/$accountId'
      fullPath: '/workspace/$namespace/accounts/$accountId'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceAccountsAccountIdIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/settings/categories/': {
      id: '/_protected/workspace/$namespace/settings/categories/'
      path: '/settings/categories'
      fullPath: '/workspace/$namespace/settings/categories'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceSettingsCategoriesIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/settings/currency/': {
      id: '/_protected/workspace/$namespace/settings/currency/'
      path: '/settings/currency'
      fullPath: '/workspace/$namespace/settings/currency'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceSettingsCurrencyIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/settings/general/': {
      id: '/_protected/workspace/$namespace/settings/general/'
      path: '/settings/general'
      fullPath: '/workspace/$namespace/settings/general'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceSettingsGeneralIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
    '/_protected/workspace/$namespace/settings/users/': {
      id: '/_protected/workspace/$namespace/settings/users/'
      path: '/settings/users'
      fullPath: '/workspace/$namespace/settings/users'
      preLoaderRoute: typeof ProtectedWorkspaceNamespaceSettingsUsersIndexImport
      parentRoute: typeof ProtectedWorkspaceNamespaceRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  ProtectedRouteRoute: ProtectedRouteRoute.addChildren({
    ProtectedSetupRoute,
    ProtectedWorkspaceNamespaceRouteRoute:
      ProtectedWorkspaceNamespaceRouteRoute.addChildren({
        ProtectedWorkspaceNamespaceIndexRoute,
        ProtectedWorkspaceNamespaceAccountsIndexRoute,
        ProtectedWorkspaceNamespaceSettingsIndexRoute,
        ProtectedWorkspaceNamespaceStocksIndexRoute,
        ProtectedWorkspaceNamespaceTransactionsIndexRoute,
        ProtectedWorkspaceNamespaceAccountsAccountIdIndexRoute,
        ProtectedWorkspaceNamespaceSettingsCategoriesIndexRoute,
        ProtectedWorkspaceNamespaceSettingsCurrencyIndexRoute,
        ProtectedWorkspaceNamespaceSettingsGeneralIndexRoute,
        ProtectedWorkspaceNamespaceSettingsUsersIndexRoute,
      }),
    ProtectedWorkspaceIndexRoute,
  }),
  PublicRouteRoute: PublicRouteRoute.addChildren({
    PublicFeaturesLazyRoute,
    PublicLoginLazyRoute,
    PublicPricingLazyRoute,
    PublicSignupLazyRoute,
    PublicStackLazyRoute,
    PublicWhyLazyRoute,
    PublicIndexLazyRoute,
  }),
})

/* prettier-ignore-end */

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
        "/_protected/setup",
        "/_protected/workspace/$namespace",
        "/_protected/workspace/"
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
    "/_protected/workspace/$namespace": {
      "filePath": "_protected/workspace/$namespace/route.tsx",
      "parent": "/_protected",
      "children": [
        "/_protected/workspace/$namespace/",
        "/_protected/workspace/$namespace/accounts/",
        "/_protected/workspace/$namespace/settings/",
        "/_protected/workspace/$namespace/stocks/",
        "/_protected/workspace/$namespace/transactions/",
        "/_protected/workspace/$namespace/accounts/$accountId/",
        "/_protected/workspace/$namespace/settings/categories/",
        "/_protected/workspace/$namespace/settings/currency/",
        "/_protected/workspace/$namespace/settings/general/",
        "/_protected/workspace/$namespace/settings/users/"
      ]
    },
    "/_protected/workspace/": {
      "filePath": "_protected/workspace/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/workspace/$namespace/": {
      "filePath": "_protected/workspace/$namespace/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/accounts/": {
      "filePath": "_protected/workspace/$namespace/accounts/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/settings/": {
      "filePath": "_protected/workspace/$namespace/settings/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/stocks/": {
      "filePath": "_protected/workspace/$namespace/stocks/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/transactions/": {
      "filePath": "_protected/workspace/$namespace/transactions/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/accounts/$accountId/": {
      "filePath": "_protected/workspace/$namespace/accounts/$accountId/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/settings/categories/": {
      "filePath": "_protected/workspace/$namespace/settings/categories/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/settings/currency/": {
      "filePath": "_protected/workspace/$namespace/settings/currency/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/settings/general/": {
      "filePath": "_protected/workspace/$namespace/settings/general/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    },
    "/_protected/workspace/$namespace/settings/users/": {
      "filePath": "_protected/workspace/$namespace/settings/users/index.tsx",
      "parent": "/_protected/workspace/$namespace"
    }
  }
}
ROUTE_MANIFEST_END */
