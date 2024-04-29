# Collections

https://rol.redhat.com/rol/app/courses/rh294-9.0/pages/ch07s07


## Installation

`ansible-galaxy collection install community.crypto -p collections`


You can install collections from a tarball (for offline environments)

`ansible-galaxy collection install /tmp/community-dns-1.2.0.tar.gz -p collections`

You can install collections from a `collections/requirements.yml` file

```yaml
---
collections:
  - name: community.crypto

  - name: ansible.posix
    version: 1.2.0
```

## Remotes

The default location is https://galaxy.ansible.com/
