/**
 * Default for maxTimeMS option.
 */
export const DEFAULT_MAX_TIME_MS = 5000;

/**
 * Number of documents to sample.
 */
export const DEFAULT_SAMPLE_SIZE = 20;

/**
 * If a stage is one of `FULL_SCAN_OPS`,
 * prepend with $limit if the collection is large.
 */
export const DEFAULT_LARGE_LIMIT = 100000;

/**
 * N/A contant.
 */
export const NA = 'N/A';

/**
 * Stage operators that are required to be the first stage.
 */
export const REQUIRED_AS_FIRST_STAGE = [
  '$collStats',
  '$currentOp',
  '$indexStats',
  '$listLocalSessions',
  '$listSessions'
];

export const VIEWS_MIN_SERVER_VERSION = '3.4.0';

/**
 * Ops that must scan the entire results before moving to the
 * next stage.
 */
export const FULL_SCAN_OPS = ['$group', '$bucket', '$bucketAuto'];

/**
 * The out stage operator.
 */
export const OUT = '$out';

/**
 * The default snippet.
 */
export const DEFAULT_SNIPPET = '{\n  \n}';

export const TOOLTIP_PREVIEW_MODE =
  'Show a preview of resulting documents after <br />' +
  'each stage in the pipeline.';

export const TOOLTIP_SAMPLING_MODE =
  'Use a random sample of documents instead of<br />' +
  'the entire collection so you can develop your<br />' +
  'pipeline quickly. Sample size can be specified<br />' +
  'in the settings panel.';

export const TOOLTIP_EXPORT_TO_LANGUAGE = 'Export pipeline code to language';

export const TOOLTIP_CREATE_NEW_PIPELINE = 'Create new pipeline';

export const TOOLTIP_OPEN_SAVED_PIPELINES = 'Open saved Pipelines';

/**
 * Map stage operators to doc URLS.
 */
export const STAGE_SPRINKLE_MAPPINGS = {
  $addFields: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />Ut enim ad minim veniam, quis nostrud exercitation<br />ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  $bucket: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/#pipe._S_bucket',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />Ut enim ad minim veniam, quis nostrud exercitation<br />ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  $bucketAuto: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/#pipe._S_bucketAuto',
    tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  $collStats: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/collStats/#pipe._S_collStats',
    tooltip: ''
  },
  $count: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/count/#pipe._S_count',
    tooltip: ''
  },
  $currentOp: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/currentOp/#pipe._S_currentOp',
    tooltip: ''
  },
  $facet: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/facet/#pipe._S_facet',
    tooltip: ''
  },
  $geoNear: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#pipe._S_geoNear',
    tooltip: ''
  },
  $graphLookup: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/graphLookup/#pipe._S_graphLookup',
    tooltip: ''
  },
  $group: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group',
    tooltip: ''
  },
  $indexStats: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/indexStats/#pipe._S_indexStats',
    tooltip: ''
  },
  $limit: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/limit/#pipe._S_limit',
    tooltip: ''
  },
  $listLocalSessions: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/listLocalSessions/#pipe._S_listLocalSessions',
    tooltip: ''
  },
  $listSessions: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/listSessions/#pipe._S_listSessions',
    tooltip: ''
  },
  $lookup: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#pipe._S_lookup',
    tooltip: ''
  },
  $match: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match',
    tooltip: ''
  },
  $merge: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_merge',
    tooltip: ''
  },
  $out: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out',
    tooltip: ''
  },
  $project: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project',
    tooltip: ''
  },
  $redact: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/redact/#pipe._S_redact',
    tooltip: ''
  },
  $replaceRoot: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/#pipe._S_replaceRoot',
    tooltip: ''
  },
  $sample: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/sample/#pipe._S_sample',
    tooltip: ''
  },
  $searchBeta: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/sample/#pipe._S_searchBeta',
    tooltip: ''
  },
  $skip: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/skip/#pipe._S_skip',
    tooltip: ''
  },
  $sort: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#pipe._S_sort',
    tooltip: ''
  },
  $sortByCount: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/#pipe._S_sortByCount',
    tooltip: ''
  },
  $unwind: {
    link: 'https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind',
    tooltip: ''
  }
};