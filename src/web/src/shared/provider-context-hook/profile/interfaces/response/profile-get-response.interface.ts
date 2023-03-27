import { Profile } from '../../../../../App/Profile/model/profile.interface';
import { StandardResponse } from '../../../../interfaces/response/standard-response.interface';

export interface ProfileGetResponse extends StandardResponse {
    statusCode: 200;
    results: Profile;
}
