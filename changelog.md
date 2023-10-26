# Agility Robotics Challenge Changelog

## Features/Requirements

- Add Annotation pin icons
  - These are converted to base64 as per Mapbox docs. Alternatively, we can host assets and retrieve them via CDN
- Menu controls panel
  - Annotations menu
  - Filters panel
- Filter by annotation type
- Filter by single annotation

## Misc

- Add Prettier configuration
- Add types definition file
- Configure Typescript path aliases
- Configure redux-logger for dev environment
- Update jest configuration in package.json to support path alias
- Refactor map initialization logic into useMap() hook
- Add custom hooks for managing state when filtering and adding annotations

## Future Improvements

- Keyboard controls to meet accessibility standards
- Debounce/throttling map click events
- Prevent interactions before map is loaded - easy to find in documentation

** Tests were partially generated :)
