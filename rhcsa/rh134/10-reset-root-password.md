# Reset root password

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch10s03

Press any key during boot to enter grub menu (also try `esc` or `shift+esc`)

Append to the line that starts with `linux` with `rd.break` and press `ctrl+x` to boot

The system will boot with the disk readonly at `/sysroot`

```bash
mount -o remount,rw /sysroot
chroot /sysroot
touch /.autorelabel #This ensures that SELinux relabels the entire file system on the next boot
exit
exit #must enter twice
```

Then change the password with `passwd`

```bash
passwd root
```

## rd.break

`rd.break` stands for "ramdisk break"

## Targets

In the bootloader, add the following to the 'linux' line

- `systemd.unit=rescue.target`
- `systemd.unit=emergency.target` (emergency loads more services such as logging)

Both of these mount the root volume as read only, `mount -o remount,rw /` to make it writable

- `systemctl list-jobs` to see what services are stuck

## Cloud recovery

Cloud based systems don't have a rescue kernel


## 9.0 bug

9.0 has a bug where it still prompts for password when using `rd.break` 
9.1 has it fixed, but the documentation is still confusing. 

Regardless, the `rd.break` method isn't the best. [This video](https://www.youtube.com/watch?v=HK7OI3uboKg) outlines a better approach. 

1. Press f8 to interupt boot process
2. append `init=/bin/bash` to `linux` line in grub menu
3. remount read/write `mount -o remount,rw /`
4. Note selinux status `/sbin/getenforce` (note $PATH won't be configured properly yet)
5. Get selinux labels of `/etc/shadow` with `ls -lZ /etc/shadow`
6. Change password `passwd`
7. Reset selinux context `chcon system_u:object_r:shadow_t:s0 /etc/shadow`
8. Enable autorelabel (optional, not needed if you ran chcon). `touch /.autorelabel`
9. Reboot, or start systemd `exec /bin/init`
10. Reboot again if autrelabel had to make changes (shouldn't be required if you ran `chcon`)