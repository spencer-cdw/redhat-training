cockpit is installed by default on rhel > 7 (except minimal)

    systemctl enable --now cockpit.socket
    firewall-cmd --add-service=cockpit --permanent
    firewall-cmd --reload

https://localhost:9090


#sos

    dnf install sos

    sos report

    ls -l /var/tmp

    sos clean


# Insights

`dnf install insights-client` #Installed by default on rhel >= 8

`subscription-manager register --auto-attach`
`insights-client --register`

https://console.redhat.com/insights