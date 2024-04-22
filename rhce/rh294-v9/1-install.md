# Install

```bash
sudo dnf install ansible-navigator ansible-core
```

Optional but recomended
Make sure you have AppStream package repository enabled `rhel-9-for-x86_64-appstream-rpms`

```bash
sudo dnf install rhel-system-roles
```

Note that `ansible-playbook` requires fqdn if using system roles

- redhat.rhel_system_roles.firewall
- rhel-system-roles.firewall
- linux-system-roles.firewall


## Docs

You can manually search docs in `/usr/share/doc/rhel-system-roles`
