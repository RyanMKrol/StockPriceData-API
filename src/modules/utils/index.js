/**
 * @module utils
 */

import moment from 'moment';
import { SUPPORTED_TIME_PERIODS, SUPPORTED_INDEXES } from '../constants';
import { TimePeriodUnsupported, IndexUnsupported } from '../errors';

/**
 * The default value from the moment import
 *
 * @typedef Moment
 */

/**
 * Gets the date indicated by the request to the API
 *
 * @param {string} timePeriod The time period passed in from the request
 * @returns {Moment} The date of the price we want to fetch for our tickers
 */
function fetchTargetHeatmapDate(timePeriod) {
  const daysToRemove = SUPPORTED_TIME_PERIODS[timePeriod];
  const date = moment();

  return date.subtract(daysToRemove, 'days');
}

/**
 * Gets the "todays" date to fetch heatmap data for. This will always be
 * one day behind as there's no guarantee that the price data API will have
 * run today yet
 *
 * @returns {Moment} "Todays" date we want to compare our heatmap data with
 */
function fetchTodayHeatmapDate() {
  return moment().subtract(1, 'days');
}

/**
 * Small method to format date according to the Heatmap spec
 *
 * @param {Moment} date The date to format
 * @returns {string} The date formatted for heatmaps
 */
function formatHeatmapDate(date) {
  return date.format('YYYY-MM-DD');
}

/**
 * Validates if the time period in the request is valid or not
 *
 * @param {string} timePeriod The time period on the request
 */
function validateHeatmapsRequestTimePeriod(timePeriod) {
  if (!Object.keys(SUPPORTED_TIME_PERIODS).includes(timePeriod)) {
    throw new TimePeriodUnsupported();
  }
}

/**
 * Validates if the index in the request is valid or not
 *
 * @param {string} index The index on the request
 */
function validateTickersDataRequestIndex(index) {
  if (!Object.keys(SUPPORTED_INDEXES).includes(index)) {
    throw new IndexUnsupported();
  }
}

export {
  fetchTargetHeatmapDate,
  fetchTodayHeatmapDate,
  formatHeatmapDate,
  validateHeatmapsRequestTimePeriod,
  validateTickersDataRequestIndex,
};
