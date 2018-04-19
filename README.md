# BART Theme for CKAN
#### https://bitbucket.org/transsightdev/ckanext-bart_theme

## Configuration
In `/etc/ckan/default/`, apply the settings below to either 'development.ini' or 'production.ini':

```
# Plugins:
ckan.plugins = bart_theme
```

## Installation options:

**1) From source**
```
<activate virtualenv> (see below)
git clone https://bitbucket.org/transsightdev/ckanext-bart_theme.git
cd ckanext-bart_theme/
sudo python setup.py install
sudo service apache2 [restart|reload] (if hosted on apache)
```

**2) Shell**
```
<activate virtualenv> (see below)
sudo pip install [-e] git+https://bitbucket.org/transsightdev/ckanext-bart_theme.git#egg=ckanext-bart_theme
```

** Shell Note:**

  0. -e option: use when in development mode.
  1. pip (1.5) might need to be updated to the latest version if `-e` option is needed.

## Linux Admin

**1) Start Python Virtualization**
```
cd /usr/lib/ckan/default/src/ckan
. /usr/lib/ckan/default/bin/activate
```

**2) Stop Python Virtualization**
```
cd /usr/lib/ckan/default/src/ckan
deactivate
```

**3) Start CKAN**
```
cd /usr/lib/ckan/default/src/ckan
paster serve /etc/ckan/default/development.ini    
```

**4) Restart Jetty**
```
sudo service jetty restart
```

**5) Start DataPusher Service**
```
cd /home/davidbalmer/ckan/datapusher
python datapusher/main.py deployment/datapusher_settings.py
```
