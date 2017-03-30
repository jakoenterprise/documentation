# Getting Started



## Recommendations

We recommend the following to help make your life easier.

### OS X Users

1. [Homebrew](https://brew.sh/), the OS X package manager (you can use this to install the requirements listed here)



## Requirements

### Software

Each of the items listed below are required for some aspect of development, management, etc. Note that this is an incomplete list, but these are some primary tools.

1. [**Vagrant**](https://www.vagrantup.com/) (v1.9.0), for managing VMs

2. [**Virtualbox**](https://www.virtualbox.org/wiki/VirtualBox) (v5.1.14), the underlying VM management software

3. [**Ansible**](https://www.ansible.com/) (v2.2.0.0), for idempotent provisioning

4. [**Packer**](https://www.packer.io/) (v0.12.3), for build images for various destinations

5. [**AWS CLI**](https://aws.amazon.com/cli/) (v1.11.66), for many day-to-day commands, system management

### Credentials

```sh
# ~/.aws/credentials
[jako]
aws_access_key_id=...
aws_secret_access_key=...

# ~/.aws/config
[profile jako]
region=us-east-1
output=json
```

**Ask an administrator or lead engineer for credentials if you don't have them**.

1. [**AWS Credentials**](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-config-files), specifically a profile called "jako" in your AWS configuration files which should look like the example to the right.

2. **An SSH keypair**, which you can generate (if you don't already have one) by following [this tutorial](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#generating-a-new-ssh-key).

3. **MySQL credentials** if you need to run stored procedures or check records in the database.
