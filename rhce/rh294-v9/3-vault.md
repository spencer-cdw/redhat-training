# Vaults

To create a vault

```
ansible-vault create foo.yml
```

or non interactive

```bash
ansible-vault create --vault-password-file=correct-horse-battery-staple secret.yml
```


### View secret

```bash
ansible-vault view secret.yml
```

### Edit secret

```bash
ansible-vault edit secret.yml
```

### Decrypt

```bash
ansible-vault decrypt secret.yml --output=foo.yml
```

## Playbooks

Be sure to propt interactivly, or pass the password as a parameter to ansible-navigator

```bash
ansible-navigator run -m stdout--playbook-artifact-enable false site.yml --vault-id @prompt
```

```bash
ansible-navigator run -m stdout site.yml --vault-password-file=foo.txt
```
