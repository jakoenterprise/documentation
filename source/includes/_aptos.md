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

**Both KicksUSA and UBIQ Aptos environments exist on the same staging server.**

### Provision Aptos

```sh
# from within the infrastructure repo

ansible-playbook -i manage/hosts/aptos-dev-kicksusa \
  --vault-password-file .vaultpass manage/deploy.yml

ansible-playbook -i manage/hosts/aptos-dev-ubiq \
  --vault-password-file .vaultpass manage/deploy.yml

ansible-playbook -i manage/hosts/aptos \
  --vault-password-file .vaultpass manage/provision.yml
```

This is a legacy process, it's sticking around until we're able to switch over the Aptos staging environment. It's unlikely this command will need to be run.

### Whitelist IPs for Aptos

Rather than do this using NGINX on the staging server itself, we've moved whitelisting to AWS security groups to make it a less technical task. Anyone with the correct permissions can whitelist a new IP by taking the following steps.

First, navigate to the EC2 dashboard.

![Navigate to the EC2 dashboard](https://cl.ly/2f1q392d072u/[070b4088b65deff8a304909f6771ef42]_Image%202017-04-03%20at%202.02.56%20PM.public.png)

Then find the newest Aptos security group. **Note that security groups can have a maximum of 25 rules each, so if "Aptos 2" fills up, start using "Aptos 3" instead.**

![Edit the newest Aptos Security Group](https://cl.ly/2w0X0M161L14/[c5206d05a119b8af3b85cd221b892ba2]_Image%202017-04-03%20at%202.08.37%20PM.public.png)

Add a new record, ensure it allows "All TCP" traffic, and add the IP CIDR. **The "/32" suffix is important for IPv4 records (e.g. 127.0.0.1), remember to add that to the end of the IP you're whitelisting. IPv6 records (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334) require a "/128" instead of "/32".** Once added the IP will be immediately able to access the Aptos server.

![Add a new record](https://cl.ly/06150p0n2O1b/Image%202017-04-03%20at%202.13.15%20PM.public.png)

Note that these security groups are attached to all of the Aptos instances, so whitelisting one time will grant access to all Aptos servers.
