# Infrastructure

## Getting Started

1. Install the necessary Python libraries by running `pip install -r requirements.txt`.

2. Download the vaultpass using `aws s3 cp s3://jako-infrastructure/credentials/vaultpass .vaultpass --profile jako`



## How To

### Deploy to Staging or Production

```sh
# deploy to the staging environment
bash bin/deploy.sh ubiq staging jakoenterprise/ubiq-magento 7de0d6692209457c5e0fd8897add2f9266346c0a
# --> staging d-96I9EBUEL

# deploy to the KicksUSA production and admin environments at the same time
bash bin/deploy.sh kicksusa production jakoenterprise/kicksusa-magento 7de0d6692209457c5e0fd8897add2f9266346c0a
# --> production d-96I9EBUEL
# --> admin d-96I9EBUEL

# check the deploy status
bash bin/status.sh d-96I9EBUEL d-96I9EBUEW # and so on
```

The output (if there's no error) will be a deployment ID, such as `d-96I9EBUEL`. You can use this identifier to check the status of the deployment.

**NOTE: there is no "rollback" mechanism right now. If a deployment is bad, re-deploy the last known working commit.**

### SSH Into An Environment

```sh
bash bin/ssh.sh ubiq staging
bash bin/ssh.sh ubiq production
bash bin/ssh.sh kicksusa staging
bash bin/ssh.sh kicksusa production
```

We should avoid this if possible (and a) use ad-hoc commands instead, or b) build the process as a Magento feature), but sometimes you just _need_ to SSH into an environment. We use what's called a [bastion host](https://en.wikipedia.org/wiki/Bastion_host) as a doorway to each private network. To simplify accessing an environment, just use the provided shell script.

**NOTE: you're SSH key needs to be whitelisted and built into the AWS AMI for this to work, otherwise someone with a whitelisted IP will need to add your public key to the `www-data` user's `~/.ssh/authorized_keys` file.**

### Run Ad-Hoc Commands

```sh
# restart the nginx service in ubiq production
ansible -b -i manage/packer/hosts/ec2.py \
  --vault-password-file .vaultpass \
  -m service -a "name=nginx state=restarted" \
  "tag_environment_production:&tag_application_ubiq"

# list a directory on kicksusa staging
ansible -b -i manage/packer/hosts/ec2.py \
  --vault-password-file .vaultpass \
  -m shell -a "ls /srv/www/magento" \
  "tag_environment_staging:&tag_application_kicksusa"

# enable maintenance mode on ubiq staging
ansible -b -i manage/packer/hosts/ec2.py \
  --vault-password-file .vaultpass \
  -m shell -a "touch /srv/www/magento/maintenance.flag" \
  "tag_environment_staging:&tag_application_ubiq"

# disable maintenance mode on ubiq staging
ansible -b -i manage/packer/hosts/ec2.py \
  --vault-password-file .vaultpass \
  -m shell -a "rm /srv/www/magento/maintenance.flag" \
  "tag_environment_staging:&tag_application_ubiq"
```

We continue to use Ansible for managing our infrastructure. If you need to run an ad-hoc (one-off) command you can use Ansible to do this. We use a dynamic inventory, so it'll adapt to whatever hosts are available at the time (they can change due to autoscaling). You can reference the [Ansible docs](http://docs.ansible.com/ansible/modules_by_category.html) for more modules.

### Image Importer Process

```sh
# 1. SSH into a node (obviously switch this up for UBIQ)
bash bin/ssh.sh kicksusa production

# 2. switch to the app directory
cd /srv/www/magento

# 3. run the CLI image importer to insert records to the DB (skip the S3 sync)
php shell/local/jako.php rms:imageImporter --skip-sync

# 4. connect to MySQL (the host for UBIQ is db.ubiqlife.com)
mysql -h db.kicksusa.com -u your.user -p

# 5. run the image import stored procedures to associate records in Magento

# kicksusa
CALL kicks_rms_import.sp_image_name_load();
CALL kicks_rms_import.sp_image_refresh();

# ubiq
CALL ubiq_rms_import.sp_ee_image_name_load();
CALL ubiq_rms_import.sp_ee_image_refresh();
```

This is a multi-stage process that ensures the latest images are associated to their products in the Magento database. You'll need SSH access and MySQL access to make this happen.
