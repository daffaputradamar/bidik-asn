/* eslint-disable @typescript-eslint/no-require-imports */
const { default: axios } = require("axios");
const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

const sql = neon(process.env.DATABASE_URL);

// Import your tables (provinces, cities, districts, villages)

// Function to insert province data into the database
const insertProvinces = async (data) => {
  try {
    for (const [code, name] of Object.entries(data)) {
      await sql`
        INSERT INTO bidikasn_provinces (code, name)
        VALUES (${code}, ${name})
      `;
    }
    console.log("Provinces inserted successfully.");
  } catch (err) {
    console.error("Error inserting provinces:", err);
  }
};

// Function to insert cities based on province
const insertCities = async (provinceId, data) => {
  try {
    for (const [code, name] of Object.entries(data)) {
      await sql`
        INSERT INTO bidikasn_cities (province_id, code, name)
        VALUES (${provinceId}, ${code}, ${name})
      `;
    }
    console.log(`Cities for province ${provinceId} inserted successfully.`);
  } catch (err) {
    console.error("Error inserting cities:", err);
  }
};

// Function to insert districts based on city
const insertDistricts = async (cityId, data) => {
  try {
    for (const [code, name] of Object.entries(data)) {
      await sql`
        INSERT INTO bidikasn_districts (city_id, code, name)
        VALUES (${cityId}, ${code}, ${name})
      `;
    }
    console.log(`Districts for city ${cityId} inserted successfully.`);
  } catch (err) {
    console.error("Error inserting districts:", err);
  }
};

// Function to insert villages based on district
const insertVillages = async (districtId, data) => {
  try {
    for (const [code, name] of Object.entries(data)) {
      await sql`
        INSERT INTO bidikasn_villages (district_id, code, name)
        VALUES (${districtId}, ${code}, ${name})
      `;
    }
    console.log(`Villages for district ${districtId} inserted successfully.`);
  } catch (err) {
    console.error("Error inserting villages:", err);
  }
};

// Fetch village data and insert
const fetchVillages = async (provinceCode, cityCode, districtCode) => {
  const villageUrl = `https://sipedas.pertanian.go.id/api/wilayah/list_des?thn=2024&lvl=13&pro=${provinceCode}&kab=${cityCode}&kec=${districtCode}`;
  const { data } = await axios.get(villageUrl);
  const district = await sql`SELECT id FROM bidikasn_districts WHERE code = ${districtCode}`;
  await insertVillages(district[0].id, data);
};

// Fetch district data and insert
const fetchDistricts = async (provinceCode, cityCode) => {
  const districtUrl = `https://sipedas.pertanian.go.id/api/wilayah/list_kec?thn=2024&lvl=12&pro=${provinceCode}&kab=${cityCode}`;
  const { data } = await axios.get(districtUrl);
  const city = await sql`SELECT id FROM bidikasn_cities WHERE code = ${cityCode}`;
  await insertDistricts(city[0].id, data);

  for (const districtCode of Object.keys(data)) {
    await fetchVillages(provinceCode, cityCode, districtCode);
  }
};

// Fetch city data and insert
const fetchCities = async (provinceCode) => {
  const cityUrl = `https://sipedas.pertanian.go.id/api/wilayah/list_kab?thn=2024&lvl=11&pro=${provinceCode}`;
  const { data } = await axios.get(cityUrl);
  const province = await sql`SELECT id FROM bidikasn_provinces WHERE code = ${provinceCode}`;
  await insertCities(province[0].id, data);

  for (const cityCode of Object.keys(data)) {
    await fetchDistricts(provinceCode, cityCode);
  }
};

// Fetch province data and insert
const fetchProvinces = async () => {
  const provinceUrl = `https://sipedas.pertanian.go.id/api/wilayah/list_pro?thn=2024`;
  const { data } = await axios.get(provinceUrl);
  await insertProvinces(data);

  for (const provinceCode of Object.keys(data)) {
    await fetchCities(provinceCode);
  }
};

// Start the region fetching process
fetchProvinces()
  .then(() => console.log("All regions fetched and stored successfully."))
  .catch((err) => console.error("Error fetching regions:", err));
