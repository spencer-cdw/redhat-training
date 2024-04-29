# Galaxy

`ansible-galaxy collection install -r requirements.yml`

### Requirements.yml

If you have a roles/requirements.yml ansible-navigator will automatically download dependencies

```
- src: https://git.example.com/someuser/someuser.myrole
  scm: git
  version: "1.5.0"
```


### Manual install


`ansible-galaxy role install -r roles/requirements.yml -p roles`

-p is only required if you haven't defined `roles_path` in the ansible.cfg

```
[defaults]
roles_path = roles
```

`ansible-galaxy list`
