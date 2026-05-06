# Kickstart


`ksvalidator`

Kickstart generator

[https://access.redhat.com/labs/kickstartconfig](https://access.redhat.com/labs/kickstartconfig)




```ini
#version=RHEL9

# Define system bootloader options
bootloader --append="console=ttyS0 console=ttyS0,115200n8 no_timer_check net.ifnames=0  crashkernel=auto" --location=mbr --timeout=1 --boot-drive=vda

# Clear and partition disks
clearpart --all --initlabel
ignoredisk --only-use=vda
zerombr
part / --fstype="xfs" --ondisk=vda --size=10000

# Define installation options
text
repo --name="appstream" --baseurl="http://classroom.example.com/content/rhel9.0/x86_64/dvd/AppStream/"
url --url="http://classroom.example.com/content/rhel9.0/x86_64/dvd/"

# Configure keyboard and language settings
keyboard --vckeymap=us
lang en_US

# Set a root password, authselect profile, and selinux policy
rootpw --plaintext redhat
authselect select sssd
selinux --enforcing
firstboot --disable

# Enable and disable system services
services --disabled="kdump,rhsmcertd" --enabled="sshd,rngd,chronyd"

# Configure the system timezone and NTP server
timezone America/New_York --utc
timesource --ntp-server classroom.example.com
```


```bash
%packages

@core
chrony
cloud-init
dracut-config-generic
dracut-norescue
firewalld
grub2
kernel
rsync
tar
-plymouth

%end
```

```bash
%post

echo "This system was deployed using Kickstart on $(date)" > /etc/motd

%end
```

Optional, specify the interpreter

```bash
%post --interpreter="/usr/libexec/platform-python"

print("This line of text is printed with python")

%end
```

---

## Example 2

Generated from https://access.redhat.com/labs/kickstartconfig/#partition

`ksvalidator /tmp/foo.cfg`

```ini
lang en_US
keyboard --xlayouts='us'
timezone America/Denver --utc
rootpw $2b$10$XnL1Bs0VV32Kt25wOxYur.i5l5CZWwR8pNJmS6kuAEskiElNitbv2 --iscrypted
reboot
rhsm --organization=foobar --activation-key=12345
bootloader --append="rhgb quiet crashkernel=1G-4G:192M,4G-64G:256M,64G-:512M"
zerombr
clearpart --all --initlabel
autopart
network --bootproto=dhcp
firstboot --disable
selinux --enforcing
firewall --enabled
%packages
@^minimal-environment
kexec-tools
%end
```



## Usage

Modify the vmlinuz line


```bash
inst.ks=http://example.com/foobar/kickstart.cfg
inst.ks=ftp://example.com/foobar/kickstart.cfg
inst.ks=nfs://example.com/foobar/kickstart.cfg
```

![](https://rol.redhat.com/rol/static/static_file_cache/rh134-9.0/kickstart/boot-kickstart.png)

