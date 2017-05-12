# Aptos

## Important!

We recently added two new AWS development servers to the mix, so now we have:

- (1) "staging" instance for both KicksUSA and UBIQ (aptos.kicksusa.com, aptos.ubiqlife.com)
- (1) "development" instance for KicksUSA (aptosdev.kicksusa.com)
- (1) "development" instance for UBIQ (aptosdev.ubiqlife.com)

The sections below have been updated, but it's important to keep the new topology in mind when maintaining the Aptos pipeline.

## Getting Started

The Aptos staging setup uses an older provisioning and deployment setup. This will move eventually, but for now we're running it in parallel.

1. Clone both the KicksUSA and UBIQ Magento repositories

And then for both of the repos you just cloned:

1. Install the required Ansible roles (in each repository) with `ansible-galaxy install -r requirements.yml`

2. Download the relevant vaultpass using `aws s3 cp s3://$BUCKET/credentials/vaultpass .vaultpass --profile jako` where `$BUCKET` is either `jako-kicksusa` or `jako-ubiq`

**Quick note a manual Aptos staging tweaks, we've added `127.0.0.1 aptos.kicksusa.com aptos.ubiqlife.com` the `/etc/hosts` file to fix an API issue where Magento cannot access its own WSDL file.**

## How To

### Deploy Aptos

```sh
# from within the kicksusa or ubiq magento repositories

ansible-playbook -i manage/hosts/aptos-dev \
  --vault-password-file .vaultpass manage/deploy.yml

ansible-playbook -i manage/hosts/aptos \
  --vault-password-file .vaultpass manage/deploy.yml
```

This is a legacy process, it's sticking around until we're able to switch over the Aptos staging environment. Ansible will deploy the `aptos` branch by default for the `aptos` host file.

**Both KicksUSA and UBIQ Aptos environments exist on the same staging server, but each app has its own, separate _aptosdev_ development server.**

### Provision Aptos

```sh
# from within the infrastructure repo

ansible-playbook -i manage/hosts/aptos-dev-kicksusa \
  --vault-password-file .vaultpass manage/provision.yml

ansible-playbook -i manage/hosts/aptos-dev-ubiq \
  --vault-password-file .vaultpass manage/provision.yml

ansible-playbook -i manage/hosts/aptos \
  --vault-password-file .vaultpass manage/provision.yml
```

This is a legacy process, it's sticking around until we're able to switch over the Aptos staging environment. It's unlikely this command will need to be run.

### Whitelist IPs for Aptos

Whitelisting IPs for Aptos is no longer necessary, we've opened up the instances to allow HTTP access from anywhere. We've also updated the `robots.txt` files to prevent search engine indexing.
