# encoding: utf-8

import json
import time
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from logging import getLogger

log = getLogger(__name__)
assert not log.disabled

def fix_facet_title(title):
  '''Change Groups to Topics. Called from /snippets/facet_list.html'''
  return 'Topics' if title == 'Groups' else title


def get_json(obj):
  '''Remove unicode prefixes before passing JSON data to client-side code.'''
  return json.dumps(obj)


def dump(obj):
  '''Dump object properties.'''
  log.info(obj);


def copyright():
  '''Get copyright with current year.'''
  strings = time.strftime("%Y,%m,%d,%H,%M,%S")
  return '&copy; {0} San Francisco Bay Area Rapid Transit District'.format(strings.split(',')[0])


def all_groups():
  '''Return a list of the groups.'''
  other_group = None
  ordered_group_info = []

  # Get a list of all the groups.
  group_info = toolkit.get_action('group_list')(data_dict={'all_fields': True})

  # Get a list of all the packages (datasets), and their Groups.
  all_packages = toolkit.get_action('package_search')(data_dict={'rows': 1000})

  # iterate thru Groups and move 'Other' (if defined) to the end of the list

  for group in group_info:
    title = group.title or group.display_name
    if title == 'Other':
      other_group = group
    else:
      ordered_group_info.append(group)

  if other_group is not None:
    ordered_group_info.append(other_group)


  # iterate thru Groups and collect Packages (datasets) that belong to that Group

  for group in ordered_group_info:
    group['datasets'] = []

    for package in all_packages['results']:
      if package['type'] == 'dataset':
        for packageGroup in package['groups']:
          if group['display_name'] == packageGroup['display_name']:
            group['datasets'].append({ 'title': package['title'], 'name' : package['name'], 'resource_id': package['resources'][0]['id'] })

  return ordered_group_info


class Bart_ThemePlugin(plugins.SingletonPlugin):
  plugins.implements(plugins.IConfigurer)
  plugins.implements(plugins.ITemplateHelpers)

  # IConfigurer

  def update_config(self, config_):
    # Add this plugin's templates dir to CKAN's extra_template_paths, so
    # that CKAN will use this plugin's custom templates.
    toolkit.add_template_directory(config_, 'templates')

    # Add this plugin's public dir to CKAN's extra_public_paths, so
    # that CKAN will use this plugin's custom static files.
    toolkit.add_public_directory(config_, 'public')

    # Register this plugin's fanstatic directory with CKAN.
    # Here, 'fanstatic' is the path to the fanstatic directory
    # (relative to this plugin.py file), and 'bart_theme' is the name
    # that we'll use to refer to this fanstatic directory from CKAN
    # templates.
    toolkit.add_resource('fanstatic', 'bart_theme')

  #ITemplateHelpers

  def get_helpers(self):
    '''Register the functions above as template helpers.'''
    # Template helper function names should begin with the name of the
    # extension they belong to, to avoid clashing with functions from
    # other extensions. eg: h.bart_theme_all_groups()
    return {
      'bart_theme_dump': dump,
      'bart_theme_get_json': get_json,
      'bart_theme_copyright': copyright,
      'bart_theme_all_groups': all_groups,
      'bart_theme_fix_facet_title': fix_facet_title
    }
