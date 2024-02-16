# rpm

    rpm -qa # list all installed packages
    rpm -qc # list config files for a package
    rpm -q --scripts #list shell scripts that run before/after install a package
    rpm -q --changelog audit # list changelog for a package
    rpm -qlp foo.rpm # list files in an uninstalled package

# rpm2cpio

Extract files from package without installing

    rpm2cpio httpd-2.4.51-7.el9_0.x86_64.rpm | cpio -tv
    rpm2cpio httpd-2.4.51-7.el9_0.x86_64.rpm | cpio -idv
    rpm2cpio httpd-2.4.51-7.el9_0.x86_64.rpm | cpio -id "*/etc/httpd/conf/httpd.conf"