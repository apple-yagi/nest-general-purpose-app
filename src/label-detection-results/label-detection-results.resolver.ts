import { Args, Query, Resolver } from '@nestjs/graphql';
import { LabelDetectionResult } from './label-detection-result';
import { LabelDetectionResultsService } from './label-detection-results.service';

@Resolver()
export class LabelDetectionResultsResolver {
  constructor(private readonly labelDetectionResultsService: LabelDetectionResultsService) { }

  @Query(returns => [LabelDetectionResult])
  labelDetectionResults(): Promise<LabelDetectionResult[]> {
    return this.labelDetectionResultsService.findAll()
  }

  @Query(returns => LabelDetectionResult)
  labelDetectionResult(@Args('id', { type: () => String }) id: string): Promise<LabelDetectionResult> {
    return this.labelDetectionResultsService.findById(id)
  }
}
