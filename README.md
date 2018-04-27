# BART Theme for CKAN
#### https://github.com/balmerd/ckanext-bart_theme

## Configuration
In `/etc/ckan/default/`, apply the settings below to either 'development.ini' or 'production.ini':

```
# Plugins:
ckan.plugins = bart_theme
```

## Installation options:

**1) From source**
```
<activate virtualenv> (see Linux Admin below)
cd /usr/lib/ckan/default
sudo rm -rf ckanext-bart_theme (to remove existing code)
sudo git clone https://github.com/balmerd/ckanext-bart_theme.git
cd ckanext-bart_theme/
sudo python setup.py develop
sudo service apache2 reload
```

**2) Shell**
```
<activate virtualenv> (see Linux Admin below)
sudo pip install -e git+https://github.com/balmerd/ckanext-bart_theme.git#egg=ckanext-bart_theme
```

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
