# Storage export

Exports generate an export link that expires after a period.
The links are protect with secret `export-token-export_name`

Downloads are aviable as `raw` or `gzip`

```bash
virtctl vmexport create --fm=fedora-vm fedora-export
virtctl vmexport download fedora-export --keep-vme --manifest --include-secret --output fedora-vm.yml
```

Or manually download the vm volume

`virtctl vmexport download fedora-export --keep-vme --volume fedora-vm --output fedora-vm-disk.img.gz`

Export from snapshot

```bash
virtctl vmexport create --snapshot=fedora-snapshot fedora-export-snapshot
virtctl vmexport delete fedora-export-snapshot
```

`oc get vmexport`

To view the schema

```bash
oc get vmexport
od describe vmexport/fedora-export
```
```yaml
Name:         fedora-export
Namespace:    vms
...output omitted...
Status:
  Links:
    External: 1
      Manifests:
        Type:  all
        URL:   https://virt-exportproxy-openshift-cnv.apps.ocp4.example.com/…/external/manifests/all
      ...output omitted...
      Volumes: 2
        Name:      fedora-vm
        Formats:
          Format:  gzip 3
          URL:     https://virt-exportproxy-openshift-cnv.apps.ocp4.example.com/…/volumes/fedora-vm/disk.img.gz
    ...output omitted...
    Internal: 4
      Manifests:
        Type:  all
        URL:   https://virt-export-fedora-export.vms.svc/internal/manifests/all
      Volumes:
        Name:     fedora-vm
        Formats:
          Format: gzip
          URL:    https://virt-export-fedora-export.vms.svc/volumes/fedora-vm/disk.img.gz
  ...output omitted...
  Phase:                 Ready
  Service Name:          virt-export-fedora-export
  Token Secret Ref:      export-token-fedora-export 5
  Ttl Expiration Time:   2025-08-05T14:19:16Z 6
  Virtual Machine Name:  fedora-vm
```

