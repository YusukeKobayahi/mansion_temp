# frozen_string_literal: true

# rubocop:disable all
module IdentifyPinrichMasterMansion
  extend Rake::DSL

  namespace :identify_pinrich_master_mansion do
    task execute: :environment do
      select_query = <<~SELECT
        mansion_buildings.*,
        prefectures.name as prefecture_name,
        cities.name as city_name,
        towns.name as town_name
      SELECT
      all_mmansions = ::Mansion::Building.select(select_query).joins(:prefecture, :city, :town)
      result_by_score = {
        '0' => [],
        '1' => [],
        '2' => [],
        '3' => [],
        '4' => [],
        '5' => [],
        'over' => [],
      }
      all_mmansions.each do |mansion|
        mmansion_id = mansion.id
        mmansion_name = mansion.name
        pref = mansion.prefecture_name
        city = mansion.city_name
        town = mansion.town_name

        inner_result = {
          'id' => mmansion_id,
          'name' => mmansion_name,
          '0' => [],
          '1' => [],
          '2' => [],
          '3' => [],
          '4' => [],
          '5' => [],
        }

        levenshtein_select_query = <<~SELECT
            id,
            building_name,
            levenshtein(building_name, "#{mmansion_name}") as lev
        SELECT

        lev_result = PinrichLiteMasterApartment
          .select(levenshtein_select_query)
          .where(prefecture_name: pref, location_name_1: city, town: town)
          .where('building_name is not NULL')
          .order('lev')
          .limit(10)
        max = nil
        lev_result.each_with_index do |lev, i|
          id = lev.id
          building_name = lev.building_name
          lev_score = lev.lev
          max = lev_score if i.zero?
          inner_result[lev_score.to_s].push("#{id} #{building_name}") unless inner_result[lev_score.to_s].nil?
        end
        if result_by_score[max.to_s].nil?
          result_by_score['over'].push(inner_result)
        else
          result_by_score[max.to_s].push(inner_result)
        end
      end
      csv_write(result_by_score['0'], '0')
      csv_write(result_by_score['1'], '1')
      csv_write(result_by_score['2'], '2')
      csv_write(result_by_score['3'], '3')
      csv_write(result_by_score['4'], '4')
      csv_write(result_by_score['5'], '5')
      csv_write(result_by_score['over'], 'over')

      calculate_ratio(result_by_score)

      def csv_write(records, num)
        CSV.open(Rails.root.join('tmp', "levenshtein_#{num}.csv"), 'w') do |io|
          io.puts(%w[
                    mmansion_id
                    mmansion_name
                    予測スコア0
                    予測スコア1
                    予測スコア2
                    予測スコア3
                    予測スコア4
                    予測スコア5
                  ])
          records.each do |rec|
            id = rec['id']
            name = rec['name']
            candidate_zero = rec['0'].join('\n')
            candidate_one = rec['1'].join('\n')
            candidate_two = rec['2'].join('\n')
            candidate_three = rec['3'].join('\n')
            candidate_four = rec['4'].join('\n')
            candidate_five = rec['5'].join('\n')
            io.puts([
                      id,
                      name,
                      candidate_zero,
                      candidate_one,
                      candidate_two,
                      candidate_three,
                      candidate_four,
                      candidate_five,
                    ])
          end
        end
      end

      def calculate_ratio(result_by_score)
        all_length = result_by_score['0'].length + result_by_score['1'].length + result_by_score['2'].length + result_by_score['3'].length + result_by_score['4'].length + result_by_score['5'].length + result_by_score['over'].length
        zero_ratio = result_by_score['0'].length / all_length * 100
        one_ratio = result_by_score['1'].length / all_length * 100
        two_ratio = result_by_score['2'].length / all_length * 100
        three_ratio = result_by_score['3'].length / all_length * 100
        four_ratio = result_by_score['4'].length / all_length * 100
        five_ratio = result_by_score['5'].length / all_length * 100
        over_ratio = result_by_score['over'].length / all_length * 100
        puts("0: #{zero_ratio}%, 1: #{one_ratio}%, 2: #{two_ratio}%, 3: #{three_ratio}%, 4: #{four_ratio}%, 5: #{five_ratio}%, over: #{over_ratio}%")
      end
    end

   
  end
end
# rubocop:enable all
