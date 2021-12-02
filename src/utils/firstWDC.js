import $ from 'jQuery';

(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id: "ams_profile_id", dataType: tableau.dataTypeEnum.string },
            { id: "user_id", dataType: tableau.dataTypeEnum.string },
            { id: "bid_plus", dataType: tableau.dataTypeEnum.string },
            { id: "campaign_name", dataType: tableau.dataTypeEnum.string },
            { id: "campaign_status", dataType: tableau.dataTypeEnum.string },
            { id: "campaign_budget", dataType: tableau.dataTypeEnum.string },
            { id: "campaign_id", dataType: tableau.dataTypeEnum.string },
            { id: "impressions", dataType: tableau.dataTypeEnum.string },
            { id: "clicks", dataType: tableau.dataTypeEnum.string },
            { id: "cost", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions1d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions7d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions30d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions1d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions7d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions14d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_conversions30d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered1d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered7d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered30d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales1d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales7d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales30d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales1d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales7d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales14d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales30d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "date", dataType: tableau.dataTypeEnum.string },
            { id: "fetch_date", dataType: tableau.dataTypeEnum.string },
            { id: "ad_type", dataType: tableau.dataTypeEnum.string },
            { id: "country", dataType: tableau.dataTypeEnum.string },
            { id: "currency", dataType: tableau.dataTypeEnum.string },
            { id: "brand", dataType: tableau.dataTypeEnum.string },
            { id: "weekly_date", dataType: tableau.dataTypeEnum.string },
            { id: "monthly_date", dataType: tableau.dataTypeEnum.string },
            { id: "campaign_budget_type", dataType: tableau.dataTypeEnum.string },
            { id: "ad_group_name", dataType: tableau.dataTypeEnum.string },
            { id: "ad_group_id", dataType: tableau.dataTypeEnum.string },
            { id: "cpc", dataType: tableau.dataTypeEnum.string },
            { id: "ctr", dataType: tableau.dataTypeEnum.string },
            { id: "conversions14d", dataType: tableau.dataTypeEnum.string },
            { id: "acos14d", dataType: tableau.dataTypeEnum.string },
            { id: "roas14d", dataType: tableau.dataTypeEnum.string },
            { id: "spc14d", dataType: tableau.dataTypeEnum.string },
            { id: "budget_util", dataType: tableau.dataTypeEnum.string },
            { id: "cpi", dataType: tableau.dataTypeEnum.string },
            { id: "portfolio_id", dataType: tableau.dataTypeEnum.string },
            { id: "dpv14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_dpv14d", dataType: tableau.dataTypeEnum.string },
            { id: "units_sold14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_sold14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_orders_new_to_brand14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_orders_new_to_brand_percentage14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_order_rate_new_to_brand14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales_new_to_brand14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_sales_new_to_brand_percentage14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered_new_to_brand14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered_new_to_brand_percentage14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_detail_page_views_clicks14d", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered1d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered7d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered14d_same_sku", dataType: tableau.dataTypeEnum.string },
            { id: "attributed_units_ordered30d_same_sku", dataType: tableau.dataTypeEnum.string }
        ];

        var tableSchema = {
            id: "fact_campaign_summary_daily",
            alias: "Campaign Summary Daily Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function (table, doneCallback) {
        $.getJSON("http://localhost:3008/v1/tableau/data", {
            x: "1",
            y: "2"
        }, function (resp) {
            var features = resp.response,
                tableData = [];
            // Iterate over the JSON object
            for (var i = 0, len = features.length; i < len; i++) {
                tableData.push({
                    "ams_profile_id": features[i].ams_profile_id,
                    "user_id": features[i].user_id,
                    "bid_plus": features[i].bid_plus,
                    "campaign_name": features[i].campaign_name,
                    "campaign_status": features[i].campaign_status,
                    "campaign_budget": features[i].campaign_budget,
                    "campaign_id": features[i].campaign_id,
                    "impressions": features[i].impressions,
                    "clicks": features[i].clicks,
                    "cost": features[i].cost,
                    "attributed_conversions1d": features[i].attributed_conversions1d,
                    "attributed_conversions7d": features[i].attributed_conversions7d,
                    "attributed_conversions14d": features[i].attributed_conversions14d,
                    "attributed_conversions30d": features[i].attributed_conversions30d,
                    "attributed_conversions1d_same_sku": features[i].attributed_conversions1d_same_sku,
                    "attributed_conversions7d_same_sku": features[i].attributed_conversions7d_same_sku,
                    "attributed_conversions14d_same_sku": features[i].attributed_conversions14d_same_sku,
                    "attributed_conversions30d_same_sku": features[i].attributed_conversions30d_same_sku,
                    "attributed_units_ordered1d": features[i].attributed_units_ordered1d,
                    "attributed_units_ordered7d": features[i].attributed_units_ordered7d,
                    "attributed_units_ordered14d": features[i].attributed_units_ordered14d,
                    "attributed_units_ordered30d": features[i].attributed_units_ordered30d,
                    "attributed_sales1d": features[i].attributed_sales1d,
                    "attributed_sales7d": features[i].attributed_sales7d,
                    "attributed_sales14d": features[i].attributed_sales14d,
                    "attributed_sales30d": features[i].attributed_sales30d,
                    "attributed_sales1d_same_sku": features[i].attributed_sales1d_same_sku,
                    "attributed_sales7d_same_sku": features[i].attributed_sales7d_same_sku,
                    "attributed_sales14d_same_sku": features[i].attributed_sales14d_same_sku,
                    "attributed_sales30d_same_sku": features[i].attributed_sales30d_same_sku,
                    "date": features[i].date,
                    "fetch_date": features[i].fetch_date,
                    "ad_type": features[i].ad_type,
                    "country": features[i].country,
                    "currency": features[i].currency,
                    "brand": features[i].brand,
                    "weekly_date": features[i].weekly_date,
                    "monthly_date": features[i].monthly_date,
                    "campaign_budget_type": features[i].campaign_budget_type,
                    "ad_group_name": features[i].ad_group_name,
                    "ad_group_id": features[i].ad_group_id,
                    "cpc": features[i].cpc,
                    "ctr": features[i].ctr,
                    "conversions14d": features[i].conversions14d,
                    "acos14d": features[i].acos14d,
                    "roas14d": features[i].roas14d,
                    "spc14d": features[i].spc14d,
                    "budget_util": features[i].budget_util,
                    "cpi": features[i].cpi,
                    "portfolio_id": features[i].portfolio_id,
                    "dpv14d": features[i].dpv14d,
                    "attributed_dpv14d": features[i].attributed_dpv14d,
                    "units_sold14d": features[i].units_sold14d,
                    "attributed_units_sold14d": features[i].attributed_units_sold14d,
                    "attributed_orders_new_to_brand14d": features[i].attributed_orders_new_to_brand14d,
                    "attributed_orders_new_to_brand_percentage14d": features[i].attributed_orders_new_to_brand_percentage14d,
                    "attributed_order_rate_new_to_brand14d": features[i].attributed_order_rate_new_to_brand14d,
                    "attributed_sales_new_to_brand14d": features[i].attributed_sales_new_to_brand14d,
                    "attributed_sales_new_to_brand_percentage14d": features[i].attributed_sales_new_to_brand_percentage14d,
                    "attributed_units_ordered_new_to_brand14d": features[i].attributed_units_ordered_new_to_brand14d,
                    "attributed_units_ordered_new_to_brand_percentage14d": features[i].attributed_units_ordered_new_to_brand_percentage14d,
                    "attributed_detail_page_views_clicks14d": features[i].attributed_detail_page_views_clicks14d,
                    "attributed_units_ordered1d_same_sku": features[i].attributed_units_ordered1d_same_sku,
                    "attributed_units_ordered7d_same_sku": features[i].attributed_units_ordered7d_same_sku,
                    "attributed_units_ordered14d_same_sku": features[i].attributed_units_ordered14d_same_sku,
                    "attributed_units_ordered30d_same_sku": features[i].attributed_units_ordered30d_same_sku
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            console.log('Hi Tableau');
            tableau.connectionName = "fact_campaign_summary_daily"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
        $("#ajaxButton").click(function () {
            $.ajax({
                data: {
                    txt1: $("#txt1").val(),
                    txt2: $("#txt2").val()
                },
                url: "http://localhost:3008/v1/tableau/authenticate?email=ameya@demandhelm.com&password=Insight@13", success: function (result) {
                    console.log(result);
                    var options = '';
                    if (result["status"] === true) {
                        var data = result["response"];
                        for (var x = 0; x < data.length; x++) {
                            options += '<option value="' + data[x]["id"] + '">' + data[x]["companyName"] + '</option>';
                        }
                    }
                    $("#div1").html(options);
                }
            });
        });
    });
})();
