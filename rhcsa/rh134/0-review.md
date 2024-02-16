# Review

Chapter 1, Improve Command-line Productivity
Run commands more efficiently by using advanced features of the Bash shell, shell scripts, and various Red Hat Enterprise Linux utilities.

Run commands more efficiently by using advanced features of the Bash shell, shell scripts, and various Red Hat Enterprise Linux utilities.

Run repetitive tasks with for loops, evaluate exit codes from commands and scripts, run tests with operators, and create conditional structures with if statements.

Create regular expressions to match data, apply regular expressions to text files with the grep command, and use grep to search files and data from piped commands.

Chapter 2, Schedule Future Tasks
Schedule tasks to execute at a specific time and date.

Set up a command to run once at a future time.

Schedule commands to run on a repeating schedule with a user's crontab file.

Schedule commands to run on a repeating schedule with the system crontab file and directories.

Enable and disable systemd timers, and configure a timer that manages temporary files.

Chapter 3, Analyze and Store Logs
Locate and accurately interpret system event logs for troubleshooting purposes.

Describe the basic Red Hat Enterprise Linux logging architecture to record events.

Interpret events in the relevant syslog files to troubleshoot problems or to review system status.

Find and interpret entries in the system journal to troubleshoot problems or review system status.

Configure the system journal to preserve the record of events when a server is rebooted.

Maintain accurate time synchronization with Network Time Protocol (NTP) and configure the time zone to ensure correct time stamps for events that are recorded by the system journal and logs.

Chapter 4, Archive and Transfer Files
Archive and copy files from one system to another.

Archive files and directories into a compressed file with tar, and extract the contents of an existing tar archive.

Transfer files to or from a remote system securely with SSH.

Efficiently and securely synchronize the contents of a local file or directory with a remote server copy.

Chapter 5, Tune System Performance
Improve system performance by setting tuning parameters and adjusting the scheduling priority of processes.

Optimize system performance by selecting a tuning profile that the tuned daemon manages.

Prioritize or deprioritize specific processes, with the nice and renice commands.

Chapter 6, Manage SELinux Security
Protect and manage server security by using SELinux.

Explain how SELinux protects resources, change the current SELinux mode of a system, and set the default SELinux mode of a system.

Manage the SELinux policy rules that determine the default context for files and directories with the semanage fcontext command, and apply the context defined by the SELinux policy to files and directories with the restorecon command.

Activate and deactivate SELinux policy rules with the setsebool command, manage the persistent value of SELinux Booleans with the semanage boolean -l command, and consult man pages that end with _selinux to find useful information about SELinux Booleans.

Use SELinux log analysis tools and display useful information during SELinux troubleshooting with the sealert command.

Chapter 7, Manage Basic Storage
Create and manage storage devices, partitions, file systems, and swap spaces from the command line.

Create storage partitions, format them with file systems, and mount them for use.

Create and manage swap spaces to supplement physical memory.

Chapter 8, Manage Storage Stack
Create and manage logical volumes that contain file systems or swap spaces from the command line.

Describe logical volume manager components and concepts, and implement LVM storage and display LVM component information.

Analyze the multiple storage components that make up the layers of the storage stack.

Chapter 9, Access Network-Attached Storage
Access network-attached storage with the NFS protocol.

Identify NFS export information, create a directory to use as a mount point, mount an NFS export with the mount command or by configuring the /etc/fstab file, and unmount an NFS export with the umount command.

Describe the benefits of using the automounter, and automount NFS exports by using direct and indirect maps.

Chapter 10, Control the Boot Process
Manage the boot process to control offered services and to troubleshoot and repair problems.

Describe the Red Hat Enterprise Linux boot process, set the default target when booting, and boot a system to a non-default target.

Log in to a system and change the root password when the current root password is lost.

Manually repair file-system configuration or corruption issues that stop the boot process.

Chapter 11, Manage Network Security
Control network connections to services with the system firewall and SELinux rules.

Accept or reject network connections to system services with firewalld rules.

Verify that network ports have the correct SELinux type for services to bind to them.

Chapter 12, Install Red Hat Enterprise Linux
Install Red Hat Enterprise Linux on servers and virtual machines.

Install Red Hat Enterprise Linux on a server.

Explain Kickstart concepts and architecture, create a Kickstart file with the Kickstart Generator website, modify an existing Kickstart file with a text editor and check its syntax with ksvalidator, publish a Kickstart file to the installer, and install Kickstart on the network.

Install a virtual machine on your Red Hat Enterprise Linux server with the web console.

Chapter 13, Run Containers
Obtain, run, and manage simple lightweight services as containers on a single Red Hat Enterprise Linux server.

Explain container concepts and the core technologies for building, storing, and running containers.

Discuss container management tools for using registries to store and retrieve images, and for deploying, querying, and accessing containers.

Provide persistent storage for container data by sharing storage from the container host, and configure a container network.

Configure a container as a systemd service, and configure a container service to start at boot time.