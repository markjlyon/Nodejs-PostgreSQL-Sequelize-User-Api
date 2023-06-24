/**
 * Database connection property interface
 * @date 6/24/2023
 *
 * @export
 * @interface IDatabaseConfigAttributes
 * @typedef {IDatabaseConfigAttributes}
 */
export interface IDatabaseConfigAttributes {
  /**
   * Database username field
   * @date 6/24/2023
   *
   * @type {?string}
   */
  username?: string;
  /**
   * Database password field
   * @date 6/24/2023
   *
   * @type {?string}
   */
  password?: string;
  /**
   * Database database field
   * @date 6/24/2023
   *
   * @type {?string}
   */
  database?: string;
  /**
   * Database host field
   * @date 6/24/2023
   *
   * @type {?string}
   */
  host?: string;
  /**
   * Database port field
   * @date 6/24/2023
   *
   * @type {?(number | string)}
   */
  port?: number | string;
  /**
   * Database dialect field
   * @date 6/24/2023
   *
   * @type {?string}
   */
  dialect?: string;
  /**
   * Database urlDatabase field
   * @date 6/24/2023
   *
   * @type {?string}
   */
  urlDatabase?: string;
  /**
   * Database tableName field
   * @date 6/24/2023
   *
   * @type {?string}
   */
  tableName?: string;
}

/**
 * Database configuration interface
 * @date 6/24/2023
 *
 * @export
 * @interface IDatabaseConfig
 * @typedef {IDatabaseConfig}
 */
export interface IDatabaseConfig {
  /**
   * Database Config development environment configuration
   * @date 6/24/2023
   *
   * @type {IDatabaseConfigAttributes}
   */
  development: IDatabaseConfigAttributes;
  /**
   * Database Config test environment configuration
   * @date 6/24/2023
   *
   * @type {IDatabaseConfigAttributes}
   */
  test: IDatabaseConfigAttributes;
  /**
   * Database Config production environment configuration
   * @date 6/24/2023
   *
   * @type {IDatabaseConfigAttributes}
   */
  production: IDatabaseConfigAttributes;
}
