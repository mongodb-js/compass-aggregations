/**
 * Default for maxTimeOutMS option.
 */
export const DEFAULT_MAX_TIMEOUT_MS = 5000;

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
