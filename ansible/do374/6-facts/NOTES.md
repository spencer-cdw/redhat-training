Gathering facts on the first play will automatically pass to the second play if gather_facts is false

There is also a smart gathering of facts

[defaults]
gathering=smart

When enabled, smart gathering gathers facts on each new host in a playbook run, but if the same host is used across multiple plays, then the host is not contacted for fact gathering again in the run.


## Automation Controller

Fact caching also works on automation controller by default. In addition, when you edit a job template in automation controller, you can select the Enable Fact Storage checkbox. This changes the fact caching plug-in to one that stores facts gathered by jobs launched by that template, so that they can be reused between multiple playbook runs. (You need to periodically run a job that gathers facts to update the automation controller fact storage if you use this feature.)

## Selective facts

You can select just a subset of facts$$

```yaml
- name: A play that gathers some facts
  hosts: all
  gather_facts: false

  tasks:
    - name: Collect only network-related facts
      ansible.builtin.setup:
        gather_subset:
          - '!all'
          - '!min'
          - network
```

