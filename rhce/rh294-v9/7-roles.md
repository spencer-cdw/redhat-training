# Roles

There are several ways to call roles in a play. The two primary methods are:

You can include or import them like a task in your tasks list.

You can create a roles list that runs specific roles before your play's tasks.

## Import

The first method is the most flexible, but the second method is also commonly used and was invented before the first method.

```yaml
- name: Run a role as a task
  hosts: remote.example.com
  tasks:
    - name: A normal task
      ansible.builtin.debug:
        msg: 'first task'
    - name: A task to import role2 here
      ansible.builtin.import_role:
        name: role2
```

This imports the following yaml files

- roles/role2/tasks/main.yml
- roles/role2/handlers/main.yml
- roles/role2/defaults/main.yml
- roles/role2/vars/main.yml



### Import with Vars

```yaml
- name: Run a role as a task
  hosts: remote.example.com
  tasks:
    - name: A task to include role2 here
      ansible.builtin.import_role:
        name: role2
      vars:
        var1: val1
        var2: val2
```


## Include

Include is the same as import, however it dynamically includes the role at _runtime_ opposed to staticaly importing it at _parsetime_. 


ansible.builtin.import_role applies the task's conditionals and loops to each of the tasks being imported.

ansible.builtin.include_role applies the task's conditionals and loops to the statement that determines whether the role is included or not.



## Roles Sections

You can also include the role in a play. Because roles run before tasks, it is typical to put them at the top. 
Usually ites best to avoid mixing roles and tasks in a single file. 

```yaml
- name: A play that only has roles
  hosts: remote.example.com
  roles:
    - role: role1
    - role: role2
```



