# kustomize

base vs overlays

When using kustomize, use the -k option to 'render' the new yaml

oc apply -f 
oc apply -k


```
base
├── configmap.yaml
├── deployment.yaml
├── secret.yaml
├── service.yaml
├── route.yaml
└── kustomization.yaml
overlays
└── development
    └── kustomization.yaml
└── testing
    └── kustomization.yaml
└── production
    ├── kustomization.yaml
    └── patch.yaml
```

see [./kustomization.yaml](./kustomization.yaml) for example of what kustomize file looks like

Fields

```bash
namespace
namePreifx
nameSuffix
labels
commonAnnotations
```


## View and Deploy

`oc kustomize overlays/production`

or

`oc apply -k kustomization-directory --dry-run=server`

```yaml
metadata:
  labels:
    env: prod
    name: frontend-prod
spec:
  replicas: 5
    selector:
  matchLabels:
      app: frontend
      env: prod
```

## Generators

