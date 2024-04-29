# yum

Setup a yum repo

Remebmer to look at `ansible-doc -F` to find the `yum_repository` docs.

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
