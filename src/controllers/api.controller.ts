import { Controller } from '@nestjs/common';
import { ApiService } from '../services/api.service';

/**
 * Api Controller
 * @date 6/24/2023
 *
 * @export
 * @class ApiController
 * @typedef {ApiController}
 */
@Controller()
export class ApiController {
  /**
   * Creates an instance of ApiController.
   * @date 6/24/2023
   *
   * @constructor
   * @param {ApiService} apiService
   */
  constructor(private readonly apiService: ApiService) {}
}
