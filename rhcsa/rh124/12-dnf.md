dnf is symlinked to yum


    ls -l /bin/| grep yum
    lrwxrwxrwx. 1 root    root           5 Mar 21  2022 yum -> dnf-3
    lrwxrwxrwx. 1 root    root          22 Mar 21  2022 yum-builddep -> /usr/libexec/dnf-utils
    lrwxrwxrwx. 1 root    root          22 Mar 21  2022 yum-config-manager -> /usr/libexec/dnf-utils
    lrwxrwxrwx. 1 root    root          22 Mar 21  2022 yum-debug-dump -> /usr/libexec/dnf-utils
    lrwxrwxrwx. 1 root    root          22 Mar 21  2022 yum-debug-restore -> /usr/libexec/dnf-utils
    lrwxrwxrwx. 1 root    root          22 Mar 21  2022 yumdownloader -> /usr/libexec/dnf-utils
    lrwxrwxrwx. 1 root    root          22 Mar 21  2022 yum-groups-manager -> /usr/libexec/dnf-utils

# DNF

    dnf help
    dhf list 'http*'
    dnf search all 'web server'
    dnf info httpd


## DNF Groups

dnf has groups of packages that can be installed together

    dnf group list
    dnf group info "RPM Development Tools"

## Logs

    tail -5 /var/log/dnf.rpm.log
    dnf history
    
you can uninstall a program from dnf history

    dnf history undo 3

# Module Streams

Module streams are a way to have 1 repo contain multiple versions of a package. 

For example, proxmox 8.0 and proxmox 8.1 could be in the same repo, and you can choose which version to install.

This saves the tedius task of adding a new repo every time a version is released. 

Modules must be manually defined starting in rhel 9
/etc/dnf/modules.defaults.d/

    dnf module list
    dnf module info <name>
    dnf module provides <package>

# Adding repos

You can either edit /etc/yum.repos.d or do dnf config-manager --add-repo

    dnf config-manager \
    --add-repo="https://dl.fedoraproject.org/pub/epel/9/Everything/x86_64/"

In the exam, you will probably need to disable gpgcheck. Disabling gpgcheck can not be done in one command, it will take multiple executions

```
dnf config-manager \
--add-repo="https://dl.fedoraproject.org/pub/epel/9/Everything/x86_64/"
dnf config-manager --setopt=https://dl.fedoraproject.org/pub/epel/9/Everything/x86_64/.gpgcheck=0 --save
```

Or an easier approach is to just manually add the following line to the repo config file

```bash
gpgcheck=0
```