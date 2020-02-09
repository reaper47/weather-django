from unittest import mock

from django.test import TestCase
from django.urls import reverse

from app.tests.conftest import A_JSON_SAMPLE

MOCK_GET_SAMPLES_FOR_DAY = 'app.backend.live.views.get_samples_for_day'
MOCK_REQUEST = 'app.backend.live.views.requests'
MOCK_ADD_NEW_SAMPLE = 'app.backend.live.views.add_new_sample'
MOCK_ADD_WIND_TO_JSON = 'app.backend.live.views.add_wind_to_json'
MOCK_SOCKET_EMIT = 'app.backend.live.views.async_to_sync'


class LiveViewTests(TestCase):

    @mock.patch(MOCK_GET_SAMPLES_FOR_DAY)
    def test_send_current_samples_to_template(self, mock_get_samples):
        """
        WHEN a user requests the Live module
        THEN the function fetching the samples in the db is called
        """
        mock_get_samples.return_value = []
        self.client.get(reverse('app:live.index'))

        self.assertTrue(mock_get_samples.called)

    @mock.patch(MOCK_REQUEST)
    @mock.patch(MOCK_ADD_NEW_SAMPLE)
    @mock.patch(MOCK_ADD_WIND_TO_JSON)
    def test_newsample_add_new_sample_called(self, mock_wind, mock_add_new_sample, mock_request):
        """
        WHEN posting sensor data to newsample
        THEN the json sample received is added to the db
        """
        mock_wind.return_value = ''
        self.client.post(reverse('app:live.newsample'), data=dict(sample=A_JSON_SAMPLE),
                         content_type='application/json')

        self.assertTrue(mock_add_new_sample.called)

    @mock.patch(MOCK_REQUEST)
    @mock.patch(MOCK_ADD_NEW_SAMPLE)
    @mock.patch(MOCK_SOCKET_EMIT)
    @mock.patch(MOCK_ADD_WIND_TO_JSON)
    def test_newsample_send_message(self, mock_wind, mock_socket, mock_add_new_sample, mock_request):
        """
        WHEN posting sensor data to newsample
        THEN a SocketIO message is sent to the client
        """
        mock_wind.return_value = ''
        mock_add_new_sample.return_value = []
        self.client.post(reverse('app:live.newsample'), data=dict(sample=A_JSON_SAMPLE),
                         content_type='application/json')

        assert mock_socket.called

    def test_show_NA_sensor_data_on_page_load_no_data(self):
        """
        GIVEN no samples in the database
        WHEN a user load the live weather page
        THEN minuses
        """
        response = self.client.get(reverse('app:live.index'), follow=True)
        data = response.content.decode()

        self.assertEqual(response.status_code, 200)
        self.assertIn('N/A', data)

    @mock.patch(MOCK_REQUEST)
    @mock.patch(MOCK_SOCKET_EMIT)
    @mock.patch(MOCK_ADD_WIND_TO_JSON)
    def test_livesample_send_message(self, mock_wind, mock_socket, mock_request):
        """
        WHEN posting sensor data to newsample
        THEN a SocketIO message is sent to the client
        """
        mock_wind.return_value = ''

        self.client.post(reverse('app:live.livesample'), data=dict(sample=A_JSON_SAMPLE),
                         content_type='application/json')

        assert mock_socket.called
