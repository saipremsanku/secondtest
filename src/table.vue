<template>

<table class="table table-bordered bg-white">
      <thead>
        <tr>
          <th>Name</th>
          <th>User Name</th>
          <th>email</th>
          <th>phone</th>
          <th>website</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="td in tableData">
          <td>td.name</td>
          <td>td.username</td>
          <td>td.email</td>
          <td>td.phone</td>
          <td>td.website</td>
          <td>

            <ul >
                <li>td.address.street</li>
                <li>td.address.suit}</li>
                <li>td.address.city</li>
                <li>td.address.zipcode</li>
                <li>Latitude & Longitude
                  <ul>
                    <li>td.address.geo.lat</li>
                    <li>td.address.geo.lng</li>
                  </ul>
                </li>
            </ul>

          </td>
        </tr>
      </tbody>
    </table>
</template>



