/**
 * An initial stage. See modules/pipeline.js
 */
export const EMPTY_STAGE = {
  stageOperator: null,
  stage: '',
  isValid: true,
  isEnabled: true,
  isExpanded: true,
  isLoading: false,
  isComplete: false,
  previewDocuments: [],
  syntaxError: null,
  error: null
};

export const DEFAULT_MAX_TIMEOUT_MS = 5000;

export const DEFAULT_SAMPLE_SIZE = 20;

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
