# yum

Setup a yum repo

Rememmer to look at `ansible-doc -F` to find the `yum_repository` docs.

```yaml
   - name: Ensure Example Repo exists
      ansible.builtin.yum_repository:
        name: example-internal
        description: Example Inc. Internal YUM repo
        file: example
        baseurl: http://materials.example.com/yum/repository/
        gpgcheck: yes

    - name: Ensure Repo RPM Key is Installed
      ansible.builtin.rpm_key:
        key: http://materials.example.com/yum/repository/RPM-GPG-KEY-example
        state: present
```


Note that installing a packages doesn't automatically update the facts that show the packages is installed. Intstead you need to manually run `package_facts`

```yaml
    - name: Gather Package Facts
      ansible.builtin.package_facts:
        manager: auto
```

## Batch uninstall

```bash
ansible all -m ansible.builtin.dnf -a 'name=simple-agent state=absent'
```

## DNF Upgrade

Install the latest version of all packages

```yaml
- name: Upgrade all packages
  ansible.builtin.dnf:
    name: '*'
    state: latest
```


## Group installs

To install a group, use `@` and group name

`dnf group list`

```yaml
- name: Install Development Tools
  ansible.builtin.dnf:
    name: '@Development Tools'
    state: present
```


## Package facts

You may need to get facts about installed packages

```yaml
- name: Gather Package Facts
  ansible.builtin.package_facts:
    manager: auto
```

Then you can reference facts at `ansible_facts['packages']`

```yaml
when: custom_pkg in ansible_facts['packages']
```
